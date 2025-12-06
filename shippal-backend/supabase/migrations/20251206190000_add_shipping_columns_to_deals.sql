-- Add shipping_origin and shipping_destination columns to deals table
alter table public.deals add column shipping_origin text;
alter table public.deals add column shipping_destination text;
