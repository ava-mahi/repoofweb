"use client";

import { useState, useEffect, useCallback } from "react";
import { ImageIcon, Upload, Check, AlertCircle, Trash2, Info } from "lucide-react";

const articles = [
  { slug: "how-to-start-instagram-faceless-content", title: "How to Start Instagram Faceless Content", suggestion: "Screenshot of your faceless account analytics, Canva design workspace, or follower growth graph" },
  { slug: "instagram-reels-algorithm-2026", title: "Instagram Reels Algorithm 2026", suggestion: "Instagram Insights screenshot showing reach/views, or a Reel analytics breakdown" },
  { slug: "ai-tools-content-creators-honest-review", title: "AI Tools I Actually Use", suggestion: "Screenshot of Claude/ChatGPT interface, your AI tool subscriptions, or a workflow screenshot" },
  { slug: "how-i-made-first-1000-creator-economy", title: "How I Made My First $1,000", suggestion: "Revenue dashboard screenshot, Gumroad sales page, or payment notification" },
  { slug: "content-creation-burnout-recovery", title: "Content Creation Burnout Recovery", suggestion: "Screen time stats, posting schedule comparison, or content calendar screenshot" },
  { slug: "instagram-carousel-posts-that-convert", title: "Instagram Carousel Formula", suggestion: "High-performing carousel analytics, before/after engagement stats" },
  { slug: "niche-selection-creator-beginners", title: "How to Pick a Niche", suggestion: "Niche research screenshot, Google Trends data, or competitor analysis" },
  { slug: "instagram-hashtags-still-matter-2026", title: "Do Hashtags Still Matter", suggestion: "Post reach comparison with/without hashtags, Instagram Insights data" },
  { slug: "i-lost-3000-followers-one-week", title: "I Lost 3,000 Followers", suggestion: "Follower count graph showing the drop, engagement rate screenshot" },
  { slug: "caption-strategy-doubled-engagement", title: "Caption Strategy", suggestion: "Engagement comparison screenshots, post analytics before/after" },
  { slug: "how-i-built-100k-faceless-account", title: "100K Faceless Account", suggestion: "Account dashboard at 100K, growth timeline, or revenue breakdown" },
  { slug: "faceless-niches-underserved-2026", title: "5 Underserved Faceless Niches", suggestion: "Niche research data, competitor analysis screenshots, or trend graphs" },
  { slug: "i-replaced-video-editor-with-ai", title: "Replaced Video Editor with AI", suggestion: "CapCut AI interface, before/after editing comparison, time-saved data" },
  { slug: "chatgpt-vs-claude-content-creators", title: "ChatGPT vs Claude", suggestion: "Side-by-side output comparison screenshot, subscription costs, or prompt examples" },
  { slug: "batching-system-week-content-3-hours", title: "Batching System", suggestion: "Content calendar, batch recording setup photo, or Notion planning board" },
  { slug: "why-your-reels-look-amateur", title: "Why Reels Look Amateur", suggestion: "Before/after Reel quality comparison, lighting setup photo, or editing interface" },
  { slug: "brand-deals-101-first-sponsorship", title: "Brand Deals 101", suggestion: "Media kit screenshot, brand email example (redacted), or rate card" },
  { slug: "hook-formula-every-reel", title: "Hook Formula", suggestion: "Reel analytics showing hook performance, view retention graph" },
  { slug: "passive-income-creators-what-works", title: "Passive Income", suggestion: "Revenue breakdown chart, Gumroad dashboard, or affiliate earnings" },
  { slug: "cross-posting-killing-growth", title: "Cross-Posting Is Killing Growth", suggestion: "Platform analytics comparison, engagement rate differences across platforms" },
  { slug: "why-small-creators-make-more", title: "Why Small Creators Make More", suggestion: "CPM comparison data, brand deal rate per follower chart" },
  { slug: "i-posted-every-day-30-days", title: "I Posted Every Day for 30 Days", suggestion: "30-day analytics overview, engagement trend line, or posting calendar" },
  { slug: "why-90-percent-reels-flop", title: "Why 90% of Reels Flop", suggestion: "Views distribution chart, top vs bottom performing Reels comparison" },
  { slug: "analytics-dashboard-every-monday", title: "Analytics Dashboard", suggestion: "Your actual analytics dashboard, Notion tracker, or spreadsheet screenshot" },
  { slug: "affiliate-links-2000-month", title: "Affiliate Links $2,000/Month", suggestion: "Affiliate earnings dashboard, commission breakdown, or payment proof" },
  { slug: "how-i-film-20-reels-2-hours", title: "How I Film 20 Reels in 2 Hours", suggestion: "Filming setup photo, batch recording workspace, or content list" },
  { slug: "best-ai-caption-writers-instagram", title: "I Tested 7 AI Caption Writers", suggestion: "Tool interface screenshots, output quality comparison, or subscription page" },
  { slug: "canva-ai-content-creation-workflow", title: "How I Use Canva AI", suggestion: "Canva workspace screenshot, Magic Design interface, or template examples" },
  { slug: "ai-tools-content-strategy-honest-review", title: "The AI Tool That Saved My Content Strategy", suggestion: "Tool dashboard, content calendar generated by AI, or workflow diagram" },
  { slug: "how-i-made-500-from-instagram-story", title: "How I Made $500 from a Single Story", suggestion: "Story analytics, swipe-up/link click data, or sale notification" },
  { slug: "digital-products-creators-what-sells", title: "Digital Products: What Sells", suggestion: "Gumroad product page, sales data, or product mockup" },
  { slug: "brand-deals-small-creators-5000-followers", title: "Brand Deals at 5,000 Followers", suggestion: "Media kit, brand DM screenshot (redacted), or follower count proof" },
  { slug: "why-instagram-growth-stalled-fixes", title: "Why Your Growth Stalled", suggestion: "Growth plateau graph, before/after fix analytics" },
  { slug: "monthly-instagram-audit-template", title: "Monthly Instagram Audit", suggestion: "Your audit template screenshot, Notion board, or analytics tracker" },
  { slug: "best-faceless-niche-instagram", title: "The Faceless Niche I Wish I Started With", suggestion: "Niche research data, account growth comparison, or revenue by niche" },
  { slug: "creator-burnout-recovery", title: "Creator Burnout Recovery", suggestion: "Screen time reduction data, posting frequency change, or wellbeing tracker" },
];

interface ArticleImage {
  id: string;
  slug: string;
  image_url: string;
  position: number;
  alt_text: string;
}

export default function ArticleImagesPage() {
  const [selectedSlug, setSelectedSlug] = useState(articles[0].slug);
  const [images, setImages] = useState<ArticleImage[]>([]);
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const selectedArticle = articles.find((a) => a.slug === selectedSlug)!;

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch(`/api/article-images?slug=${selectedSlug}`);
      const data = await res.json();
      if (Array.isArray(data)) setImages(data);
    } catch {
      setImages([]);
    }
  }, [selectedSlug]);

  useEffect(() => {
    fetchImages();
    setError(null);
    setSuccess(null);
  }, [fetchImages]);

  const uploadImage = async (position: number, file: File, altText: string) => {
    setUploading(position);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", selectedSlug);
    formData.append("position", String(position));
    formData.append("alt_text", altText);

    try {
      const res = await fetch("/api/article-images", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setSuccess(`Image ${position} uploaded successfully!`);
      fetchImages();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(null);
    }
  };

  const deleteImage = async (id: string, position: number) => {
    if (!confirm("Delete this image?")) return;
    try {
      const res = await fetch(`/api/article-images?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setSuccess(`Image ${position} removed.`);
      fetchImages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <ImageIcon className="h-6 w-6" /> Article Proof Images
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Upload screenshots, analytics, or proof images for each article. These appear inline within the article body to build trust and credibility for AdSense.
      </p>

      {/* Article selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Article</label>
        <select
          className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm"
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
        >
          {articles.map((a) => {
            const hasImg = images.some((i) => i.slug === a.slug);
            return (
              <option key={a.slug} value={a.slug}>
                {a.title}
              </option>
            );
          })}
        </select>
      </div>

      {/* Suggestion box */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20 p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Suggested image for this article:</p>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">{selectedArticle.suggestion}</p>
        </div>
      </div>

      {/* Upload slots */}
      <div className="space-y-4 mb-6">
        {[1, 2, 3].map((position) => {
          const existing = images.find((i) => i.position === position);
          return (
            <ImageSlot
              key={`${selectedSlug}-${position}`}
              position={position}
              existing={existing}
              uploading={uploading === position}
              onUpload={(file, alt) => uploadImage(position, file, alt)}
              onDelete={() => existing && deleteImage(existing.id, position)}
            />
          );
        })}
      </div>

      {/* Status messages */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg mb-4">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-950/30 p-3 rounded-lg mb-4">
          <Check className="h-4 w-4" /> {success}
        </div>
      )}

      {/* Position explanation */}
      <div className="rounded-lg border border-border bg-secondary/30 p-4 text-xs text-muted-foreground space-y-1">
        <p><strong>Position 1:</strong> Appears after the 2nd heading in the article</p>
        <p><strong>Position 2:</strong> Appears after the 4th heading in the article</p>
        <p><strong>Position 3:</strong> Appears after the 6th heading in the article</p>
      </div>
    </div>
  );
}

function ImageSlot({
  position,
  existing,
  uploading,
  onUpload,
  onDelete,
}: {
  position: number;
  existing?: ArticleImage;
  uploading: boolean;
  onUpload: (file: File, alt: string) => void;
  onDelete: () => void;
}) {
  const [alt, setAlt] = useState(existing?.alt_text || "");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Image {position}</h3>
        {existing && (
          <button onClick={onDelete} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
            <Trash2 className="h-3 w-3" /> Remove
          </button>
        )}
      </div>

      {existing && !preview ? (
        <div className="mb-3">
          <img src={existing.image_url} alt={existing.alt_text} className="w-full h-40 object-cover rounded-lg" />
          <p className="text-xs text-muted-foreground mt-1">{existing.alt_text || "No caption"}</p>
        </div>
      ) : preview ? (
        <div className="mb-3">
          <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
        </div>
      ) : null}

      {!existing && (
        <>
          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors mb-3">
            <Upload className="h-6 w-6 text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">{file ? file.name : "Click to select image"}</p>
            <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
          </label>
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Caption / alt text (e.g., 'My Instagram analytics for March 2026')"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs mb-3 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={() => file && onUpload(file, alt)}
            disabled={!file || uploading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {uploading ? "Uploading..." : <><Upload className="h-3 w-3" /> Upload Image {position}</>}
          </button>
        </>
      )}
    </div>
  );
}
