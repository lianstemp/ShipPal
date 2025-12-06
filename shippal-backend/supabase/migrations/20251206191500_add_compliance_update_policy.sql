-- Migration: Add UPDATE policy for compliance_documents
-- Created at: 2025-12-06

-- Allow users to update compliance documents if they are part of the deal
-- We could restrict by owner_role here, but frontend validation + general deal access is a good start.
-- For stricter security:
-- using (deal_id is not null and exists (select 1 from public.deals d join public.contacts c on d.contact_id = c.id where d.id = deal_id and ((c.buyer_id = auth.uid() and owner_role = 'buyer') or (c.seller_id = auth.uid() and (owner_role = 'seller' or owner_role is null)))));

create policy "Users can update docs in their deal" on public.compliance_documents for update 
using (deal_id is not null and exists (select 1 from public.deals d join public.contacts c on d.contact_id = c.id where d.id = deal_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())));
