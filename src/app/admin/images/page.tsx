"use client";

import { useState, useCallback } from "react";
import { ImageIcon, Upload, Check, AlertCircle, Copy } from "lucide-react";

const posts = [
  { slug: "how-to-start-instagram-faceless-content", title: "How to Start Instagram Faceless Content" },
  { slug: "instagram-reels-algorithm-2026", title: "Instagram Reels Algorithm 2026" },
  { slug: "ai-tools-content-creators-honest-review", title: "AI Tools I Actually Use" },
  { slug: "how-i-made-first-1000-creator-economy", title: "How I Made My First $1,000" },
  { slug: "content-creation-burnout-recovery", title: "Content Creation Burnout Recovery" },
  { slug: "instagram-carousel-posts-that-convert", title: "Instagram Carousel Formula" },
  { slug: "niche-selection-creator-beginners", title: "How to Pick a Niche" },
  { slug: "instagram-hashtags-still-matter-2026", title: "Do Hashtags Still Matter" },
  { slug: "i-lost-3000-followers-one-week", title: "I Lost 3,000 Followers" },
  { slug: "caption-strategy-doubled-engagement", title: "Caption Strategy" },
  { slug: "how-i-built-100k-faceless-account", title: "100K Faceless Account" },
  { slug: "faceless-niches-underserved-2026", title: "5 Underserved Faceless Niches" },
  { slug: "i-replaced-video-editor-with-ai", title: "Replaced Video Editor with AI" },
  { slug: "chatgpt-vs-claude-content-creators", title: "ChatGPT vs Claude" },
  { slug: "batching-system-week-content-3-hours", title: "Batching System" },
  { slug: "why-your-reels-look-amateur", title: "Why Reels Look Amateur" },
  { slug: "brand-deals-101-first-sponsorship", title: "Brand Deals 101" },
  { slug: "hook-formula-every-reel", title: "Hook Formula" },
  { slug: "passive-income-creators-what-works", title: "Passive Income" },
  { slug: "cross-posting-killing-growth", title: "Cross-Posting Is Killing Growth" },
  { slug: "why-small-creators-make-more", title: "Why Small Creators Make More" },
  { slug: "i-posted-every-day-30-days", title: "I Posted Every Day for 30 Days" },
  { slug: "why-90-percent-reels-flop", title: "Why 90% of Reels Flop" },
  { slug: "analytics-dashboard-every-monday", title: "Analytics Dashboard" },
  { slug: "affiliate-links-2000-month", title: "Affiliate Links $2,000/Month" },
  { slug: "how-i-film-20-reels-2-hours", title: "How I Film 20 Reels in 2 Hours" },
];

export default function AdminImagesPage() {
  const [selectedPost, setSelectedPost] = useState(posts[0].slug);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ url: string; path: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  }, []);

  const upload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", selectedPost);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ImageIcon className="h-6 w-6" /> Image Upload
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Select Post</label>
          <select
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
            value={selectedPost}
            onChange={(e) => { setSelectedPost(e.target.value); setResult(null); setError(null); }}
          >
            {posts.map((p) => (
              <option key={p.slug} value={p.slug}>{p.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Choose Image</label>
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {file ? file.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 5MB</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
          </label>
        </div>

        {preview && (
          <div className="rounded-lg overflow-hidden border border-border">
            <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          </div>
        )}

        <button
          onClick={upload}
          disabled={!file || uploading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {uploading ? "Uploading..." : (
            <>
              <Upload className="h-4 w-4" /> Upload Image
            </>
          )}
        </button>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" /> {error}
          </div>
        )}

        {result && (
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
              <Check className="h-4 w-4" /> Uploaded successfully
            </div>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={result.url}
                className="flex-1 text-xs bg-white dark:bg-black border border-border rounded px-2 py-1.5"
              />
              <button
                onClick={copyUrl}
                className="flex items-center gap-1 rounded border border-border px-2 py-1.5 text-xs hover:bg-secondary transition-colors"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Paste this URL into <code className="bg-secondary px-1 rounded">src/data/posts.ts</code> as the <code className="bg-secondary px-1 rounded">coverImage</code> value for the selected post, then rebuild and redeploy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
