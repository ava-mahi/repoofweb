import Link from "next/link";
import { ArrowRight, TrendingUp, Zap, BookOpen } from "lucide-react";
import { getFeaturedPosts, getTrendingPosts, getRecentPosts, getPopularPosts, getCategories } from "@/lib/blog-service";
import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";
import CategoryCard from "@/components/CategoryCard";
import Newsletter from "@/components/Newsletter";

export default async function Home() {
  const [featured, trending, recent, popular, categories] = await Promise.all([
    getFeaturedPosts(),
    getTrendingPosts(),
    getRecentPosts(6),
    getPopularPosts(4),
    getCategories(),
  ]);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium mb-6">
              <Zap className="h-3.5 w-3.5" />
              Real strategies from real experience
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Grow on Instagram <br className="hidden md:block" />
              <span className="text-muted-foreground">without the fluff.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Honest advice on faceless content, Reels strategy, AI tools, and creator monetization.
              No guru BS. Just what actually worked for me.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/how-to-start-instagram-faceless-content"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start Reading <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/category/instagram-growth"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary transition-colors"
              >
                Browse Topics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <SectionHeader title="Featured" subtitle="Hand-picked articles worth your time" />
          <div className="grid gap-6 md:grid-cols-2">
            {featured.slice(0, 2).map((post) => (
              <ArticleCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-border">
        <SectionHeader title="Explore Topics" subtitle="Pick a lane and go deep" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Trending */}
      {trending.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-border">
          <SectionHeader title="Trending Now" subtitle="What's getting the most attention this week" href="/category/instagram-growth" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trending.slice(0, 3).map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Two-column: Recent + Popular */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-border">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeader title="Latest Posts" subtitle="Fresh off the press" href="/category/content-creation" />
            <div className="grid gap-6 sm:grid-cols-2">
              {recent.slice(0, 4).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5" />
                  <h3 className="font-bold">Most Read</h3>
                </div>
                <div className="space-y-5">
                  {popular.map((post) => (
                    <ArticleCard key={post.id} post={post} horizontal />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="font-bold">About Maya</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I grew three Instagram accounts past 50K and burnt out twice along the way.
                  Now I write about what actually works — no guru shortcuts, just honest lessons.
                </p>
                <Link href="/about" className="mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline">
                  Read my story <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
