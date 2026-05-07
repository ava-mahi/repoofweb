-- Initial schema for GrowWithMaya blog
-- Apply this migration to your Supabase project

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT 'bg-gradient-to-br from-gray-500 to-slate-500',
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category_name TEXT,
  tags TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'Maya Chen',
  author_image TEXT,
  published_at DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ DEFAULT now(),
  reading_time INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title TEXT,
  meta_description TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Allow public read access on categories"
  ON categories FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public read access on published posts"
  ON posts FOR SELECT TO anon, authenticated USING (status = 'published');

CREATE POLICY "Allow authenticated read access on all posts"
  ON posts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on posts"
  ON posts FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update on posts"
  ON posts FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete on posts"
  ON posts FOR DELETE TO authenticated USING (true);

-- Newsletter subscribers: only admins can read, anyone can insert
CREATE POLICY "Allow public insert on newsletter_subscribers"
  ON newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated read on newsletter_subscribers"
  ON newsletter_subscribers FOR SELECT TO authenticated USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured);
CREATE INDEX IF NOT EXISTS idx_posts_trending ON posts(trending);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);

-- Function to update post_count on categories
CREATE OR REPLACE FUNCTION update_category_post_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'published' THEN
    UPDATE categories SET post_count = post_count + 1 WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'published' THEN
    UPDATE categories SET post_count = post_count - 1 WHERE id = OLD.category_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.status != 'published' AND NEW.status = 'published' THEN
    UPDATE categories SET post_count = post_count + 1 WHERE id = NEW.category_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.status = 'published' AND NEW.status != 'published' THEN
    UPDATE categories SET post_count = post_count - 1 WHERE id = OLD.category_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to keep category post counts in sync
DROP TRIGGER IF EXISTS trigger_update_post_count ON posts;
CREATE TRIGGER trigger_update_post_count
AFTER INSERT OR DELETE OR UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_category_post_count();
