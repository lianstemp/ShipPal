-- Migration: Refactor Schema for Contacts and Deals
-- Created at: 2025-12-02

-- 1. Create CONTACTS table
-- Represents a permanent connection between a buyer and a seller
create table public.contacts (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id) not null,
  seller_id uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(buyer_id, seller_id)
);

alter table public.contacts enable row level security;
create policy "Users can view their own contacts" on public.contacts for select 
using (auth.uid() = buyer_id or auth.uid() = seller_id);

-- 2. Create DEALS table
-- Represents a specific transaction/order
create type deal_status as enum ('negotiating', 'sealed', 'payment_pending', 'paid', 'shipping', 'delivered', 'completed', 'cancelled');

create table public.deals (
  id uuid default gen_random_uuid() primary key,
  contact_id uuid references public.contacts(id) not null,
  status deal_status default 'negotiating',
  total_amount numeric default 0,
  currency text default 'USD',
  shipping_cost numeric default 0,
  shipping_address text,
  payment_method text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.deals enable row level security;
create policy "Users can view their own deals" on public.deals for select 
using (exists (select 1 from public.contacts where id = contact_id and (buyer_id = auth.uid() or seller_id = auth.uid())));
create policy "Users can update their own deals" on public.deals for update 
using (exists (select 1 from public.contacts where id = contact_id and (buyer_id = auth.uid() or seller_id = auth.uid())));
create policy "Users can insert deals in their contacts" on public.deals for insert 
with check (exists (select 1 from public.contacts where id = contact_id and (buyer_id = auth.uid() or seller_id = auth.uid())));

-- 3. Create DEAL_ITEMS table
-- Items included in a deal
create table public.deal_items (
  id uuid default gen_random_uuid() primary key,
  deal_id uuid references public.deals(id) on delete cascade not null,
  product_id uuid references public.products(id), -- Can be null if custom item? Better to enforce product.
  name text, -- Snapshot of product name
  quantity numeric not null,
  price_per_unit numeric not null,
  total_price numeric generated always as (quantity * price_per_unit) stored,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.deal_items enable row level security;
create policy "Users can view items in their deals" on public.deal_items for select 
using (exists (select 1 from public.deals d join public.contacts c on d.contact_id = c.id where d.id = deal_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())));
create policy "Users can manage items in their deals" on public.deal_items for all 
using (exists (select 1 from public.deals d join public.contacts c on d.contact_id = c.id where d.id = deal_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())));

-- 4. Update MESSAGES table
-- Add contact_id and make match_id nullable
alter table public.messages add column contact_id uuid references public.contacts(id);
alter table public.messages alter column match_id drop not null;
alter table public.messages add column is_ai_generated boolean default false;

-- Policy for messages with contact_id
create policy "Users can view messages in their contact" on public.messages for select 
using (contact_id is not null and exists (select 1 from public.contacts where id = contact_id and (buyer_id = auth.uid() or seller_id = auth.uid())));
create policy "Users can send messages in their contact" on public.messages for insert 
with check (contact_id is not null and exists (select 1 from public.contacts where id = contact_id and (buyer_id = auth.uid() or seller_id = auth.uid())));

-- 5. Update COMPLIANCE_DOCUMENTS table
-- Add deal_id and make match_id nullable
alter table public.compliance_documents add column deal_id uuid references public.deals(id);
alter table public.compliance_documents alter column match_id drop not null;
alter table public.compliance_documents add column title text;
alter table public.compliance_documents add column description text;

-- Policy for docs with deal_id
create policy "Users can view docs in their deal" on public.compliance_documents for select 
using (deal_id is not null and exists (select 1 from public.deals d join public.contacts c on d.contact_id = c.id where d.id = deal_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())));
create policy "Users can upload docs in their deal" on public.compliance_documents for insert 
with check (deal_id is not null and exists (select 1 from public.deals d join public.contacts c on d.contact_id = c.id where d.id = deal_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())));

-- 6. Trigger to auto-create Contact from Match (Optional, or handle in app logic)
-- For now, we will handle this in the Application Logic (when "Approve" is clicked).
