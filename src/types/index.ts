export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  authorImage?: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  trending: boolean;
  status: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  views?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  postCount: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}
