import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const supabase = createClient(supabaseUrl, supabaseKey);

    let query = supabase.from("article_images").select("*").order("position");
    if (slug) query = query.eq("slug", slug);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const slug = formData.get("slug") as string;
    const position = parseInt(formData.get("position") as string) || 1;
    const altText = (formData.get("alt_text") as string) || "";

    if (!file || !slug) {
      return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `inline/${slug}-${position}.${ext}`;

    // Upload to storage
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

    // Upsert to article_images table
    const { error: dbError } = await supabase
      .from("article_images")
      .upsert(
        { slug, image_url: imageUrl, position, alt_text: altText },
        { onConflict: "slug,position" }
      );

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from("article_images").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
