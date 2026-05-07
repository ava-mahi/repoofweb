"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { searchPosts } from "@/data/posts";
import ArticleCard from "@/components/ArticleCard";
import { Search, X } from "lucide-react";
import Link from "next/link";

export default function SearchResults() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchPosts(query);
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto mb-10">
        <form action="/search" method="GET" className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            name="q"
            defaultValue={query}
            type="text"
            placeholder="Search articles, tips, strategies..."
            className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
          {query && (
            <Link href="/search" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </Link>
          )}
        </form>
      </div>

      {query && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </h1>
        </div>
      )}

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No results found. Try a different keyword.</p>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Type a keyword above to search our articles.</p>
        </div>
      )}
    </div>
  );
}
