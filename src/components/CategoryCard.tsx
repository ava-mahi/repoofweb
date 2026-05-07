import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
    >
      <div className={`absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full opacity-10 ${category.color}`} />
      <div className="relative">
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${category.color} text-white mb-4`}>
          <ArrowUpRight className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold mb-1">{category.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{category.description}</p>
        <span className="text-xs font-medium text-muted-foreground">{category.postCount} articles</span>
      </div>
    </Link>
  );
}
