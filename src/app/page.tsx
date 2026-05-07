import Link from "next/link";
import { ArrowRight, TrendingUp, Zap, BookOpen, Sparkles } from "lucide-react";
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
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/80 via-purple-100/60 to-amber-100/80 dark:from-rose-950/30 dark:via-purple-950/20 dark:to-amber-950/30 animate-gradient-slow" />
        
        {/* Floating orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-400/30 to-rose-300/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[-30%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-400/20 to-indigo-300/10 blur-3xl animate-float-medium" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-amber-400/20 to-orange-300/10 blur-3xl animate-float-fast" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-border/50 px-4 py-1.5 text-xs font-semibold mb-8 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Real strategies from real experience</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
                Grow on{" "}
                <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  Instagram
                </span>
                <br />
                <span className="text-foreground">without the fluff.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                Honest advice on faceless content, Reels strategy, AI tools, and creator monetization.
                No guru BS. Just what actually worked for me.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/how-to-start-instagram-faceless-content"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Start Reading <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/category/instagram-growth"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/60 dark:bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold hover:bg-white/80 dark:hover:bg-white/10 transition-all"
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
