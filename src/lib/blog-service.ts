import { supabase } from "./supabase";
import { Post, Category } from "@/types";
import { posts as localPosts, categories as localCategories } from "@/data/posts";

// Try Supabase first, fall back to local data if Supabase isn't set up yet
const useSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getMergedPosts(): Promise<Post[]> {
  let dbPosts: Post[] = [];
  if (useSupabase) {
    const { data, error } = await supabase.from("posts").select("*").eq("status", "published");
    if (!error && data) {
      dbPosts = data.map(mapSupabasePost);
    }
  }
  const merged = new Map<string, Post>();
  for (const p of localPosts.filter((p) => p.status === "published")) {
    merged.set(p.slug, p);
  }
  for (const p of dbPosts) {
    merged.set(p.slug, p);
  }
  return Array.from(merged.values());
}

export async function getCategories(): Promise<Category[]> {
  const merged = await getMergedPosts();
  const countByCategory = new Map<string, number>();
  for (const p of merged) {
    countByCategory.set(p.category, (countByCategory.get(p.category) || 0) + 1);
  }

  const mergeCounts = (cats: Category[]): Category[] =>
    cats.map((c) => ({ ...c, postCount: countByCategory.get(c.name) || 0 }));

  if (!useSupabase) return mergeCounts(localCategories);

  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error || !data || data.length === 0) return mergeCounts(localCategories);

  return data.map((c: any) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description || "",
    color: c.color || "bg-gradient-to-br from-gray-500 to-slate-500",
    postCount: countByCategory.get(c.name) || 0,
  }));
}

export async function getPosts(): Promise<Post[]> {
  const merged = await getMergedPosts();
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const merged = await getMergedPosts();
  return merged.find((p) => p.slug === slug);
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const cat = localCategories.find((c) => c.slug === categorySlug);
  if (!cat) return [];
  const merged = await getMergedPosts();
  return merged
    .filter((p) => p.category === cat.name)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const merged = await getMergedPosts();
  return merged
    .filter((p) => p.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getTrendingPosts(): Promise<Post[]> {
  const merged = await getMergedPosts();
  return merged
    .filter((p) => p.trending)
    .sort((a, b) => (b.views || 0) - (a.views || 0));
}

export async function getRecentPosts(limit: number = 6): Promise<Post[]> {
  const merged = await getMergedPosts();
  return merged
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export async function getPopularPosts(limit: number = 6): Promise<Post[]> {
  const merged = await getMergedPosts();
  return merged
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

export async function searchPosts(query: string): Promise<Post[]> {
  const lower = query.toLowerCase();
  const merged = await getMergedPosts();
  return merged.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.excerpt.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.toLowerCase().includes(lower)) ||
      p.category.toLowerCase().includes(lower)
  );
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
