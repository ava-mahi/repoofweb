// Curated Unsplash photo URLs mapped by category theme
// Each post gets a deterministic image based on its slug hash

const unsplashPhotos: Record<string, string[]> = {
  default: [
    "https://images.unsplash.com/photo-1611162617213-9c72f5d6f295?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=500&fit=crop&q=80",
  ],
  "instagram-growth": [
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&fit=crop&q=80",
  ],
  "faceless-content": [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=500&fit=crop&q=80",
  ],
  "ai-tools": [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop&q=80",
  ],
  "content-creation": [
    "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&h=500&fit=crop&q=80",
  ],
  "creator-economy": [
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&q=80",
  ],
  "reels-strategy": [
    "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492691527719?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524253482453-3fed8c3f12f7?w=800&h=500&fit=crop&q=80",
  ],
  monetization: [
    "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565514020176-db98b5f6ab36?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&q=80",
  ],
  "social-media-tips": [
    "https://images.unsplash.com/photo-1611162616475-46b635fb686e?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop&q=80",
  ],
};

// Simple hash function for deterministic image selection
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getPostImageUrl(slug: string, categorySlug?: string): string {
  const pool = unsplashPhotos[categorySlug || "default"] || unsplashPhotos.default;
  const index = hashString(slug) % pool.length;
  return pool[index];
}

export function getHeroImageUrl(): string {
  return "https://images.unsplash.com/photo-1611162617213-9c72f5d6f295?w=1400&h=700&fit=crop&q=80";
}

// Generate a CSS gradient placeholder if images fail
export function getPlaceholderGradient(category?: string): string {
  const gradients: Record<string, string> = {
    "instagram-growth": "from-pink-500 via-rose-400 to-orange-400",
    "faceless-content": "from-violet-500 via-purple-400 to-indigo-400",
    "ai-tools": "from-cyan-500 via-blue-400 to-indigo-400",
    "content-creation": "from-amber-500 via-orange-400 to-red-400",
    "creator-economy": "from-emerald-500 via-teal-400 to-cyan-400",
    "reels-strategy": "from-red-500 via-pink-400 to-purple-400",
    monetization: "from-yellow-500 via-amber-400 to-orange-400",
    "social-media-tips": "from-indigo-500 via-violet-400 to-fuchsia-400",
  };
  return gradients[category || "default"] || "from-slate-500 via-zinc-400 to-stone-400";
}
