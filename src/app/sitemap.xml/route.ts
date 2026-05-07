import { getAllSlugs, posts, categories } from "@/data/posts";

export async function GET() {
  const baseUrl = "https://growwithmaya.com";

  const staticPages = ["", "about/", "contact/", "privacy/", "terms/", "disclaimer/"];

  const urls = [
    ...staticPages.map((page) => `<url><loc>${baseUrl}/${page}</loc><priority>${page === "" ? "1.0" : "0.5"}</priority></url>`),
    ...getAllSlugs().map((slug) => `<url><loc>${baseUrl}/${slug}/</loc><priority>0.8</priority></url>`),
    ...categories.map((cat) => `<url><loc>${baseUrl}/category/${cat.slug}/</loc><priority>0.6</priority></url>`),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
