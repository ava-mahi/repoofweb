import { NextResponse } from "next/server";
import { createPost, getPosts } from "@/lib/blog-service";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await createPost(body);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create post" }, { status: 500 });
  }
}
