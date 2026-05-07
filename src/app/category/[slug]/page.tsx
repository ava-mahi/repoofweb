import { notFound } from "next/navigation";
import { Metadata } from "next";
import { categories, getPostsByCategory } from "@/data/posts";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} | GrowWithMaya`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return notFound();

  const posts = getPostsByCategory(slug);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${category.color} text-white mb-4`}>
          <span className="text-xl font-bold">{category.name.charAt(0)}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{category.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">{category.description}</p>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No articles in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
