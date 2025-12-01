-- Add UPDATE policy for matches table
create policy "Users can update their own matches" on public.matches for update
using (auth.uid() = buyer_id or auth.uid() = seller_id);
