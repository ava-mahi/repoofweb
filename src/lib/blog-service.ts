import { supabase } from "./supabase";
import { Post, Category } from "@/types";
import { posts as localPosts, categories as localCategories } from "@/data/posts";

// Try Supabase first, fall back to local data if Supabase isn't set up yet
const useSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getCategories(): Promise<Category[]> {
  if (!useSupabase) return localCategories;
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error || !data || data.length === 0) return localCategories;
  return data.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description || "",
    color: c.color || "bg-gradient-to-br from-gray-500 to-slate-500",
    postCount: c.post_count || 0,
  }));
}

export async function getPosts(): Promise<Post[]> {
  if (!useSupabase) return localPosts.filter((p) => p.status === "published");
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return localPosts.filter((p) => p.status === "published");
  return data.map(mapSupabasePost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  if (!useSupabase) return localPosts.find((p) => p.slug === slug);
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (error || !data) return localPosts.find((p) => p.slug === slug);
  return mapSupabasePost(data);
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  if (!useSupabase) {
    const cat = localCategories.find((c) => c.slug === categorySlug);
    if (!cat) return [];
    return localPosts.filter((p) => p.category === cat.name && p.status === "published");
  }
  const { data: catData } = await supabase.from("categories").select("*").eq("slug", categorySlug).single();
  if (!catData) {
    const cat = localCategories.find((c) => c.slug === categorySlug);
    if (!cat) return [];
    return localPosts.filter((p) => p.category === cat.name && p.status === "published");
  }
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category_id", catData.id)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return localPosts.filter((p) => p.category === catData.name && p.status === "published");
  return data.map(mapSupabasePost);
}

export async function getFeaturedPosts(): Promise<Post[]> {
  if (!useSupabase) return localPosts.filter((p) => p.featured && p.status === "published");
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("featured", true)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return localPosts.filter((p) => p.featured && p.status === "published");
  return data.map(mapSupabasePost);
}

export async function getTrendingPosts(): Promise<Post[]> {
  if (!useSupabase) return localPosts.filter((p) => p.trending && p.status === "published").sort((a, b) => (b.views || 0) - (a.views || 0));
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("trending", true)
    .eq("status", "published")
    .order("views", { ascending: false });
  if (error || !data || data.length === 0) return localPosts.filter((p) => p.trending && p.status === "published").sort((a, b) => (b.views || 0) - (a.views || 0));
  return data.map(mapSupabasePost);
}

export async function getRecentPosts(limit: number = 6): Promise<Post[]> {
  if (!useSupabase) return localPosts.filter((p) => p.status === "published").sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit);
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error || !data || data.length === 0) return localPosts.filter((p) => p.status === "published").sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit);
  return data.map(mapSupabasePost);
}

export async function getPopularPosts(limit: number = 6): Promise<Post[]> {
  if (!useSupabase) return localPosts.filter((p) => p.status === "published").sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("views", { ascending: false })
    .limit(limit);
  if (error || !data || data.length === 0) return localPosts.filter((p) => p.status === "published").sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
  return data.map(mapSupabasePost);
}

export async function searchPosts(query: string): Promise<Post[]> {
  const lower = query.toLowerCase();
  if (!useSupabase) {
    return localPosts.filter(
      (p) =>
        p.status === "published" &&
        (p.title.toLowerCase().includes(lower) ||
          p.excerpt.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.toLowerCase().includes(lower)) ||
          p.category.toLowerCase().includes(lower))
    );
  }
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .or(`title.ilike.%${lower}%,excerpt.ilike.%${lower}%`)
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) {
    return localPosts.filter(
      (p) =>
        p.status === "published" &&
        (p.title.toLowerCase().includes(lower) ||
          p.excerpt.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.toLowerCase().includes(lower)) ||
          p.category.toLowerCase().includes(lower))
    );
  }
  return data.map(mapSupabasePost);
}

export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<Post[]> {
  const current = await getPostBySlug(currentSlug);
  if (!current) return [];
  const allPosts = await getPosts();
  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => p.category === current.category || p.tags.some((t) => current.tags.includes(t)))
    .slice(0, limit);
}

// Admin-only functions (require auth)
export async function createPost(post: Omit<Post, "id">) {
  const { data, error } = await supabase.from("posts").insert({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    cover_image: post.coverImage,
    category_name: post.category,
    tags: post.tags,
    author: post.author,
    reading_time: post.readingTime,
    featured: post.featured,
    trending: post.trending,
    status: post.status,
    meta_title: post.metaTitle,
    meta_description: post.metaDescription,
  }).select().single();
  return { data, error };
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const dbUpdates: Record<string, any> = {};
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
  if (updates.excerpt !== undefined) dbUpdates.excerpt = updates.excerpt;
  if (updates.content !== undefined) dbUpdates.content = updates.content;
  if (updates.coverImage !== undefined) dbUpdates.cover_image = updates.coverImage;
  if (updates.category !== undefined) dbUpdates.category_name = updates.category;
  if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
  if (updates.author !== undefined) dbUpdates.author = updates.author;
  if (updates.authorImage !== undefined) dbUpdates.author_image = updates.authorImage;
  if (updates.publishedAt !== undefined) dbUpdates.published_at = updates.publishedAt;
  if (updates.readingTime !== undefined) dbUpdates.reading_time = updates.readingTime;
  if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
  if (updates.trending !== undefined) dbUpdates.trending = updates.trending;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.metaTitle !== undefined) dbUpdates.meta_title = updates.metaTitle;
  if (updates.metaDescription !== undefined) dbUpdates.meta_description = updates.metaDescription;
  if (updates.views !== undefined) dbUpdates.views = updates.views;

  const { data, error } = await supabase.from("posts").update(dbUpdates as any).eq("id", id).select().single();
  return { data, error };
}

export async function deletePost(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  return { error };
}

function mapSupabasePost(data: any): Post {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.cover_image || undefined,
    category: data.category_name || "Uncategorized",
    tags: data.tags || [],
    author: data.author || "Maya Chen",
    authorImage: data.author_image || undefined,
    publishedAt: data.published_at || new Date().toISOString().split("T")[0],
    updatedAt: data.updated_at || undefined,
    readingTime: data.reading_time || 5,
    featured: data.featured || false,
    trending: data.trending || false,
    status: data.status || "published",
    metaTitle: data.meta_title || undefined,
    metaDescription: data.meta_description || undefined,
    views: data.views || 0,
  };
}
