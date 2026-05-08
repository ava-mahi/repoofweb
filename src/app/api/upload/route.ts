import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const slug = formData.get("slug") as string;
    const title = (formData.get("title") as string) || slug;

    if (!file || !slug) {
      return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${slug}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("post-images")
      .getPublicUrl(path);

    const imageUrl = publicUrlData.publicUrl;

    // Try RPC function first (bypasses RLS)
    let dbUpdated = false;
    let dbError = null;

    try {
      const { error: rpcError } = await supabase.rpc("update_post_cover_image", {
        p_slug: slug,
        p_title: title,
        p_cover_image: imageUrl,
      });
      if (rpcError) {
        dbError = rpcError.message;
        console.log("RPC failed:", rpcError.message);
      } else {
        dbUpdated = true;
      }
    } catch (e: any) {
      dbError = e.message;
      console.log("RPC exception:", e.message);
    }

    // Fallback: try direct upsert to post_images table
    if (!dbUpdated) {
      try {
        const { error: upsertError } = await supabase
          .from("post_images")
          .upsert({ slug, image_url: imageUrl, updated_at: new Date().toISOString() });
        if (upsertError) {
          console.log("post_images upsert failed:", upsertError.message);
          dbError = upsertError.message;
        } else {
          dbUpdated = true;
          dbError = null;
        }
      } catch (e: any) {
        console.log("post_images exception:", e.message);
        dbError = e.message;
      }
    }

    return NextResponse.json({
      url: imageUrl,
      path,
      dbUpdated,
      dbError,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
