import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center animate-in fade-in duration-500">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-8">
        <span className="text-4xl font-extrabold text-muted-foreground">404</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Home className="h-4 w-4" /> Back to Home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary transition-colors"
        >
          <Search className="h-4 w-4" /> Search Articles
        </Link>
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <h2 className="text-sm font-semibold mb-4">Popular Topics</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/category/instagram-growth" className="rounded-full bg-secondary px-4 py-2 text-sm hover:bg-secondary/80 transition-colors">Instagram Growth</Link>
          <Link href="/category/faceless-content" className="rounded-full bg-secondary px-4 py-2 text-sm hover:bg-secondary/80 transition-colors">Faceless Content</Link>
          <Link href="/category/ai-tools" className="rounded-full bg-secondary px-4 py-2 text-sm hover:bg-secondary/80 transition-colors">AI Tools</Link>
          <Link href="/category/monetization" className="rounded-full bg-secondary px-4 py-2 text-sm hover:bg-secondary/80 transition-colors">Monetization</Link>
          <Link href="/about" className="rounded-full bg-secondary px-4 py-2 text-sm hover:bg-secondary/80 transition-colors">About Maya</Link>
        </div>
      </div>
    </div>
  );
}
