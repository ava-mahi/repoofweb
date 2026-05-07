import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Post } from "@/types";
import { formatDate } from "@/lib/utils";
import { getPostImageUrl } from "@/lib/images";

interface ArticleCardProps {
  post: Post;
  featured?: boolean;
  horizontal?: boolean;
}

export default function ArticleCard({ post, featured = false, horizontal = false }: ArticleCardProps) {
  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all">
        <Link href={`/${post.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
            <Image
              src={post.coverImage || getPostImageUrl(post.slug)}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground mb-3">
                {post.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">{post.title}</h3>
              <p className="text-sm text-white/80 line-clamp-2 mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-white/70">
                <span>{post.author}</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (horizontal) {
    return (
      <article className="group flex gap-4 items-start">
        <Link href={`/${post.slug}`} className="block shrink-0 w-24 h-24 rounded-xl bg-secondary overflow-hidden relative">
          <Image
            src={post.coverImage || getPostImageUrl(post.slug)}
            alt={post.title}
            fill
            className="object-cover"
            sizes="96px"
            unoptimized
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/${post.slug}`}>
            <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h4>
          </Link>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <Link href={`/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={post.coverImage || getPostImageUrl(post.slug)}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-xs font-medium">
            {post.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </Link>
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/${post.slug}`}>
          <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          {post.views && (
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {(post.views / 1000).toFixed(1)}k</span>
          )}
        </div>
      </div>
    </article>
  );
}
