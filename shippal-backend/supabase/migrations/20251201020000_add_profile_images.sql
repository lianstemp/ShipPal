-- Add images column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS images text[];

-- Create storage bucket for images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies

-- Policy: Public access to view images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- Policy: Authenticated users can upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

-- Policy: Users can update their own images (based on path convention or ownership)
-- For simplicity, we allow authenticated users to update/delete for now, 
-- ideally we should restrict by folder name like `uid/*`
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1] );

CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1] );
