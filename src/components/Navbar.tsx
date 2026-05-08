"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Search, Menu, X, Sun, Moon, AtSign, ExternalLink } from "lucide-react";
import { categories } from "@/data/posts";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <img src="/logo.png" alt="GrowWithMaya" className="h-8 w-8 rounded-full object-cover" />
            <span>GrowWithMaya</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/category/instagram-growth" className="text-sm font-medium hover:text-primary transition-colors">Instagram</Link>
            <Link href="/category/faceless-content" className="text-sm font-medium hover:text-primary transition-colors">Faceless</Link>
            <Link href="/category/ai-tools" className="text-sm font-medium hover:text-primary transition-colors">AI Tools</Link>
            <Link href="/category/monetization" className="text-sm font-medium hover:text-primary transition-colors">Monetize</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">Resources</Link>
            <a
              href="https://www.instagram.com/maya?igsh=YXhuaTNxbmZpZTIz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
              aria-label="Instagram"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-full p-2 hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full p-2 hover:bg-secondary transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background px-4 py-3">
          <form action="/search" method="GET" className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="q"
                type="text"
                placeholder="Search articles, tips, and strategies..."
                className="w-full rounded-lg border border-border bg-secondary py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2">Home</Link>
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2">
                {cat.name}
              </Link>
            ))}
            <Link href="/about" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2">About</Link>
            <Link href="/resources" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2">Resources</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2">Contact</Link>
            <a
              href="https://www.instagram.com/maya?igsh=YXhuaTNxbmZpZTIz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium py-2 flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" /> Instagram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
