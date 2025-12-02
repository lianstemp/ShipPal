-- Add owner_role and is_optional to compliance_documents
ALTER TABLE compliance_documents 
ADD COLUMN owner_role text CHECK (owner_role IN ('buyer', 'seller')) DEFAULT 'seller',
ADD COLUMN is_optional boolean DEFAULT false;

-- Create storage bucket for compliance documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('compliance_docs', 'compliance_docs', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to compliance_docs (for simplicity in this hackathon)
-- Ideally we'd restrict this, but for now allow authenticated users to upload
CREATE POLICY "Authenticated users can upload compliance docs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'compliance_docs' );

CREATE POLICY "Public can view compliance docs"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'compliance_docs' );
