"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, ExternalLink } from "lucide-react";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error("Failed to fetch posts:", data.error);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      alert("Error deleting post");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">
            {loading ? "Loading..." : `${posts.length} posts total`}
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category, or slug..."
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Views</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    Loading posts...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    {search ? "No posts match your search." : "No posts found."}
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium truncate max-w-xs">{post.title}</div>
                      <div className="text-xs text-muted-foreground">/{post.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{post.category}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${post.status === "published" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{(post.views || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{post.publishedAt}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/${post.slug}`} target="_blank" className="rounded-md p-1.5 hover:bg-secondary transition-colors" title="View post">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link href={`/admin/posts/${post.id}/edit`} className="rounded-md p-1.5 hover:bg-secondary transition-colors" title="Edit post">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => deletePost(post.id)}
                          disabled={deleting === post.id}
                          className="rounded-md p-1.5 hover:bg-destructive/10 text-destructive transition-colors disabled:opacity-50"
                          title="Delete post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
