"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";

const categories = [
  "Instagram Growth",
  "Faceless Content",
  "AI Tools",
  "Content Creation",
  "Creator Economy",
  "Reels Strategy",
  "Monetization",
  "Social Media Tips",
];

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts`, { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        const post = data.find((p: any) => p.id === params.id);
        if (post) {
          setForm({
            ...post,
            tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags || "",
          });
        } else {
          alert("Post not found");
          router.push("/admin/posts");
        }
      }
    } catch (err) {
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const slug = form.slug || "post";
      const data = new FormData();
      data.append("file", file);
      data.append("slug", slug);
      data.append("title", form.title || slug);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (res.ok) {
        update("coverImage", result.url);
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.title || !form.slug) {
      alert("Title and slug are required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      };
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin/posts");
      } else {
        alert(data.error || "Failed to update post");
      }
    } catch (err: any) {
      alert(err.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading post...
      </div>
    );
  }

  if (!form) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Post not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/posts" className="rounded-md p-2 hover:bg-secondary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
          <p className="text-muted-foreground">Update post details.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-2">Slug *</label>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">Content (HTML) *</label>
          <textarea
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            rows={12}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <div className="flex gap-3 items-start">
            <input
              value={form.coverImage || ""}
              onChange={(e) => update("coverImage", e.target.value)}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="https://images.unsplash.com/..."
            />
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm hover:bg-secondary/80 transition-colors">
                <ImagePlus className="h-4 w-4" />
                {uploading ? "Uploading..." : "Upload"}
              </span>
            </label>
          </div>
          {form.coverImage && (
            <img src={form.coverImage} alt="Preview" className="mt-2 h-32 w-auto rounded-lg object-cover" />
          )}
        </div>

        {/* Category & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <input
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Meta Title</label>
            <input
              value={form.metaTitle || ""}
              onChange={(e) => update("metaTitle", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Meta Description</label>
            <input
              value={form.metaDescription || ""}
              onChange={(e) => update("metaDescription", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Published Date</label>
            <input
              type="date"
              value={form.publishedAt}
              onChange={(e) => update("publishedAt", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Reading Time</label>
            <input
              type="number"
              value={form.readingTime}
              onChange={(e) => update("readingTime", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Views</label>
            <input
              type="number"
              value={form.views || 0}
              onChange={(e) => update("views", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.trending}
              onChange={(e) => update("trending", e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm">Trending</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/admin/posts"
            className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
