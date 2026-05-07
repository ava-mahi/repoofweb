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

    // Use RPC function to bypass RLS and update/insert cover_image
    await supabase.rpc("update_post_cover_image", {
      p_slug: slug,
      p_title: title,
      p_cover_image: imageUrl,
    });

    return NextResponse.json({
      url: imageUrl,
      path,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
