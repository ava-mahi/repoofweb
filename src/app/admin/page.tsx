"use client";

import { posts } from "@/data/posts";
import { categories } from "@/data/posts";
import Link from "next/link";
import { FileText, Eye, TrendingUp, Tag } from "lucide-react";

export default function AdminDashboard() {
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your blog performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-secondary p-2"><FileText className="h-4 w-4" /></div>
            <span className="text-sm text-muted-foreground">Total Posts</span>
          </div>
          <p className="text-3xl font-bold">{totalPosts}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-secondary p-2"><Eye className="h-4 w-4" /></div>
            <span className="text-sm text-muted-foreground">Published</span>
          </div>
          <p className="text-3xl font-bold">{publishedPosts}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-secondary p-2"><TrendingUp className="h-4 w-4" /></div>
            <span className="text-sm text-muted-foreground">Total Views</span>
          </div>
          <p className="text-3xl font-bold">{(totalViews / 1000).toFixed(1)}k</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-secondary p-2"><Tag className="h-4 w-4" /></div>
            <span className="text-sm text-muted-foreground">Categories</span>
          </div>
          <p className="text-3xl font-bold">{categories.length}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Posts</h2>
          <Link href="/admin/posts" className="text-sm text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Views</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {posts.slice(0, 6).map((post) => (
                <tr key={post.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium truncate max-w-xs">{post.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{post.category}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${post.status === "published" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{(post.views || 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{post.publishedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
