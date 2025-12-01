-- Add INSERT policy for matches table
create policy "Users can create matches" on public.matches for insert 
with check (auth.uid() = buyer_id or auth.uid() = seller_id);
