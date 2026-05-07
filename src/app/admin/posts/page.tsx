"use client";

import { useState } from "react";
import { posts as initialPosts, categories } from "@/data/posts";
import { Post } from "@/types";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Save } from "lucide-react";

export default function PostsPage() {
  const [postList, setPostList] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Post>>({});

  const filtered = postList.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (post: Post) => {
    setEditing(post.id);
    setEditForm({ ...post });
  };

  const saveEdit = () => {
    if (!editing) return;
    setPostList((prev) =>
      prev.map((p) => (p.id === editing ? { ...p, ...editForm } as Post : p))
    );
    setEditing(null);
  };

  const deletePost = (id: string) => {
    if (confirm("Delete this post?")) {
      setPostList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
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
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                  {editing === post.id ? (
                    <>
                      <td className="px-4 py-3">
                        <input
                          value={editForm.title || ""}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full rounded-md border border-border bg-background px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={editForm.category || ""}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="rounded-md border border-border bg-background px-2 py-1 text-sm"
                        >
                          {categories.map((c) => (
                            <option key={c.slug} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={editForm.status || ""}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value as "draft" | "published" })}
                          className="rounded-md border border-border bg-background px-2 py-1 text-sm"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{(post.views || 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={saveEdit} className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200 transition-colors">
                          <Save className="h-3 w-3" /> Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">
                        <Link href={`/${post.slug}`} className="font-medium hover:underline">
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{post.category}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${post.status === "published" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{(post.views || 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEdit(post)} className="rounded-md p-1.5 hover:bg-secondary transition-colors">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => deletePost(post.id)} className="rounded-md p-1.5 hover:bg-destructive/10 text-destructive transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
