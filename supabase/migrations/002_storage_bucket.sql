-- Create a public bucket for post images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('post-images', 'post-images', true, 5242880, array['image/png', 'image/jpeg', 'image/jpg', 'image/webp']);

-- Enable public read access
CREATE POLICY "Public read access for post-images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'post-images' );

-- Enable authenticated uploads (allow service role or anon for now since we use anon key)
CREATE POLICY "Allow uploads to post-images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'post-images' );
