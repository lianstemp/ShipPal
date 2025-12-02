-- Migration: Add Insert Policy for Contacts
-- Created at: 2025-12-02

-- Allow users to insert contacts if they are either the buyer or the seller
create policy "Users can insert their own contacts" on public.contacts for insert 
with check (auth.uid() = buyer_id or auth.uid() = seller_id);
