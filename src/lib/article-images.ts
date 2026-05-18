import { supabase } from "./supabase";

export interface ArticleImage {
  id: string;
  slug: string;
  image_url: string;
  position: number;
  alt_text: string;
}

export async function getArticleImages(slug: string): Promise<ArticleImage[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("article_images")
      .select("*")
      .eq("slug", slug)
      .order("position");

    if (error || !data) return [];
    return data as ArticleImage[];
  } catch {
    return [];
  }
}

export function injectInlineImages(html: string, images: ArticleImage[]): string {
  if (images.length === 0) return html;

  // Insert images after specific H2 positions: position 1 -> after 2nd H2, position 2 -> after 4th H2, position 3 -> after 6th H2
  const positionMap: Record<number, number> = { 1: 2, 2: 4, 3: 6 };

  let h2Count = 0;
  const parts = html.split(/(?=<h2)/);
  const result: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("<h2")) {
      h2Count++;
    }
    result.push(part);

    // Check if any image should be inserted after this H2's content
    for (const img of images) {
      const targetH2 = positionMap[img.position] || img.position * 2;
      if (h2Count === targetH2) {
        result.push(
          `<figure class="my-8 rounded-xl overflow-hidden border border-border">` +
          `<img src="${img.image_url}" alt="${img.alt_text || ""}" class="w-full h-auto" loading="lazy" />` +
          (img.alt_text ? `<figcaption class="px-4 py-2 text-xs text-center text-muted-foreground bg-secondary/30">${img.alt_text}</figcaption>` : "") +
          `</figure>`
        );
      }
    }
  }

  return result.join("");
}
