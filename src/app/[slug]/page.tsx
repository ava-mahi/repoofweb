import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-service";
import { getArticleImages, injectInlineImages } from "@/lib/article-images";
import { getAllSlugs, categories as localCategories } from "@/data/posts";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Clock, Share2, Link2, Bookmark, MessageSquare, AlertTriangle } from "lucide-react";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";

const MONETIZATION_SLUGS = new Set([
  "how-i-made-first-1000-creator-economy",
  "how-i-built-100k-faceless-account",
  "passive-income-creators-what-works",
  "why-small-creators-make-more",
  "affiliate-links-2000-month",
  "brand-deals-101-first-sponsorship",
]);

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
    },
  };
}

function injectHeadingIds(content: string): { html: string; headings: { id: string; text: string; level: number }[] } {
  const headings: { id: string; text: string; level: number }[] = [];
  let counter = 0;
  const html = content.replace(/<(h[23])>(.*?)<\/\1>/g, (match, tag, innerHtml) => {
    const text = innerHtml.replace(/<[^>]*>/g, "");
    const baseId = text.toLowerCase().replace(/\s+/g, "-");
    counter++;
    const id = `${baseId}-${counter}`;
    headings.push({ id, text, level: parseInt(tag.replace("h", "")) });
    return `<${tag} id="${id}">${innerHtml}</${tag}>`;
  });
  return { html, headings };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const [related, articleImages] = await Promise.all([
    getRelatedPosts(slug, 3),
    getArticleImages(slug),
  ]);

  const contentWithImages = injectInlineImages(post.content, articleImages);
  const { html: contentWithIds, headings: toc } = injectHeadingIds(contentWithImages);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://www.growwithmaya.info/about/",
    },
    publisher: {
      "@type": "Organization",
      name: "GrowWithMaya",
      url: "https://www.growwithmaya.info",
      logo: {
        "@type": "ImageObject",
        url: "https://www.growwithmaya.info/logo.png",
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.growwithmaya.info/${slug}/`,
    },
    wordCount: post.content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length,
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="animate-in fade-in duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Breadcrumb & Meta */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href={`/category/${localCategories.find(c => c.name === post.category)?.slug || '#'}`} className="hover:text-foreground">{post.category}</Link>
              <span>/</span>
              <span className="text-foreground truncate">{post.title}</span>
            </nav>

            <header className="mb-10">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{post.author}</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span className="text-xs">Last updated: May 2026</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readingTime} min read</span>
              </div>
            </header>

            <div className="mb-6 rounded-lg border border-yellow-200/60 bg-yellow-50/60 dark:border-yellow-900/30 dark:bg-yellow-950/15 p-3 text-xs text-yellow-800 dark:text-yellow-400 leading-relaxed">
              <strong>Disclosure:</strong> This post may contain affiliate links. If you purchase through my links, I earn a small commission at no extra cost to you.
            </div>

            {MONETIZATION_SLUGS.has(post.slug) && (
              <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>Results Disclaimer:</strong> The income figures and growth results mentioned in this article reflect personal experience and are not typical. Individual results will vary based on effort, niche, timing, and many other factors. This is not a guarantee of income.
                </p>
              </div>
            )}

            {/* Share Bar */}
            <div className="flex items-center gap-2 mb-8 pb-8 border-b border-border">
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary transition-colors">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary transition-colors">
                <MessageSquare className="h-4 w-4" /> X / Twitter
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary transition-colors">
                <Link2 className="h-4 w-4" /> Copy Link
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary transition-colors ml-auto">
                <Bookmark className="h-4 w-4" /> Save
              </button>
            </div>

            {/* Content */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Box */}
            <div className="mt-12 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                  M
                </div>
                <div>
                  <h4 className="font-bold">{post.author}</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Creator, writer, and recovering perfectionist. I share what I learn growing Instagram accounts and building a creator business — the honest way.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-bold mb-4">Table of Contents</h3>
                  <ul className="space-y-2">
                    {toc.map((h) => (
                      <li key={h.id} className={h.level === 2 ? "" : "pl-4"}>
                        <a href={`#${h.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related */}
              {related.length > 0 && (
                <div>
                  <h3 className="font-bold mb-4">Related Articles</h3>
                  <div className="space-y-5">
                    {related.map((r) => (
                      <ArticleCard key={r.id} post={r} horizontal />
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Mini */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-bold mb-2">Liked this?</h3>
                <p className="text-sm text-muted-foreground mb-4">Get creator tips every Monday. No spam.</p>
                <form action="/api/newsletter" method="POST" className="flex gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* More Articles */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.id} post={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
