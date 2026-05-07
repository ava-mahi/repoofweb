import { supabase } from "@/lib/supabase";
import { categories as localCategories, posts as localPosts } from "@/data/posts";

export default async function SeedPage() {
  let message = "";
  let error = "";

  try {
    // Seed categories
    for (const cat of localCategories) {
      await supabase.from("categories").upsert(
        {
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
          color: cat.color,
          post_count: cat.postCount,
        },
        { onConflict: "slug" }
      );
    }

    // Seed posts
    for (const post of localPosts) {
      await supabase.from("posts").upsert(
        {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          cover_image: post.coverImage,
          category_name: post.category,
          tags: post.tags,
          author: post.author,
          published_at: post.publishedAt,
          reading_time: post.readingTime,
          featured: post.featured,
          trending: post.trending,
          status: post.status,
          meta_title: post.metaTitle,
          meta_description: post.metaDescription,
          views: post.views,
        },
        { onConflict: "slug" }
      );
    }

    message = `Seeded ${localCategories.length} categories and ${localPosts.length} posts successfully!`;
  } catch (e: any) {
    error = e.message || "Unknown error occurred during seeding.";
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Database Seed</h1>
      {message && <p className="text-emerald-600 dark:text-emerald-400 font-medium">{message}</p>}
      {error && <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>}
      <div className="mt-8 text-sm text-muted-foreground">
        <p>Categories: {localCategories.length}</p>
        <p>Posts: {localPosts.length}</p>
      </div>
      <a href="/" className="mt-6 inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
        Back to Home
      </a>
    </div>
  );
}
