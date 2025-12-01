-- 1. ENUMS & TYPES
-- Membuat tipe data kustom agar data konsisten (Idempotent)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        create type user_role as enum ('buyer', 'seller', 'admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'match_status') THEN
        create type match_status as enum ('pending', 'matched', 'rejected', 'closed');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'doc_status') THEN
        create type doc_status as enum ('pending', 'verified', 'rejected');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'shipment_status') THEN
        create type shipment_status as enum ('negotiating', 'contract_signed', 'payment_pending', 'paid', 'shipping', 'delivered', 'completed');
    END IF;
END $$;

-- ==============================================================================
-- 2. PUBLIC PROFILES (MENGHUBUNGKAN DENGAN SUPABASE AUTH)
-- ==============================================================================
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role user_role default 'seller', -- Default role, nanti user bisa pilih di UI onboarding
  full_name text, -- Bisa kosong di awal, diisi user setelah login
  company_name text,
  avatar_url text, 
  country text,
  bio text,
  is_verified boolean default false, -- Centang biru jika dokumen perusahaan valid
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Mengaktifkan RLS (Keamanan)
alter table public.profiles enable row level security;

-- Policy: Semua orang bisa melihat profil publik, user hanya bisa edit profil sendiri
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- ==============================================================================
-- 3. PRODUCTS (SUPPLY - DIPOSTING OLEH SELLER)
-- ==============================================================================
create table public.products (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) not null,
  name text not null, -- Misal: Kopi Gayo Arabika
  description text,
  category text, -- Misal: Agriculture, Textile, Handicraft
  capacity_per_month numeric, -- Kapasitas produksi (PENTING BUAT MATCHING)
  moq numeric, -- Minimum Order Quantity (PENTING BUAT MATCHING)
  price_per_unit numeric,
  currency text default 'USD',
  specs jsonb, -- Menyimpan detail spesifik (e.g., {"grade": "A", "moisture": "12%"})
  images text[], -- Array URL foto dari Storage
  quality_score float, -- Skor dari AI Computer Vision (0.0 - 10.0)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.products enable row level security;
create policy "Products are viewable by everyone" on public.products for select using (true);
create policy "Sellers can insert/update their own products" on public.products for all using (auth.uid() = seller_id);

-- ==============================================================================
-- 4. BUYING REQUESTS (DEMAND - DIPOSTING OLEH BUYER)
-- ==============================================================================
create table public.buying_requests (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id) not null,
  title text not null, -- Misal: Looking for 500kg Rattan Chairs
  description text,
  category text,
  required_qty numeric, -- PENTING BUAT MATCHING
  target_price numeric,
  destination_country text, -- Penting untuk AI Compliance Officer menentukan dokumen
  deadline date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.buying_requests enable row level security;
create policy "Requests are viewable by everyone" on public.buying_requests for select using (true);
create policy "Buyers can manage their requests" on public.buying_requests for all using (auth.uid() = buyer_id);

-- ==============================================================================
-- 5. SWIPES (LOGIKA TINDER)
-- Mencatat aksi swipe kanan/kiri
-- ==============================================================================
create table public.swipes (
  id uuid default gen_random_uuid() primary key,
  swiper_id uuid references public.profiles(id) not null, -- Siapa yang swipe
  target_id uuid not null, -- ID Produk (jika buyer swipe) atau ID Request (jika seller swipe)
  target_type text check (target_type in ('product', 'request')), -- Apa yang di-swipe
  direction text check (direction in ('right', 'left')), -- Right = Like, Left = Pass
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(swiper_id, target_id, target_type) -- Mencegah double swipe pada item yang sama
);

alter table public.swipes enable row level security;
create policy "Users can insert their own swipes" on public.swipes for insert with check (auth.uid() = swiper_id);
create policy "Users can view their own swipes" on public.swipes for select using (auth.uid() = swiper_id);

-- ==============================================================================
-- 6. MATCHES / DEALS (ROOM CHAT TERBUKA)
-- Tabel ini terisi ketika terjadi "Double Swipe" (Saling Like)
-- ==============================================================================
create table public.matches (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id) not null,
  seller_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id), -- Link ke produk yang di-match
  request_id uuid references public.buying_requests(id), -- Link ke request yang di-match
  status match_status default 'matched',
  shipment_status shipment_status default 'negotiating',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.matches enable row level security;
-- User hanya bisa melihat match di mana dia terlibat
create policy "Users can view their own matches" on public.matches for select 
using (auth.uid() = buyer_id or auth.uid() = seller_id);

-- ==============================================================================
-- 7. MESSAGES (CHAT ROOM DENGAN TRANSLASI)
-- ==============================================================================
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  match_id uuid references public.matches(id) not null,
  sender_id uuid references public.profiles(id) not null,
  content_original text not null, -- Pesan asli user (misal: Bhs Indonesia)
  content_translated text, -- Pesan terjemahan AI (misal: Bhs Inggris)
  language_code text, -- id, en, zh, dll
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.messages enable row level security;
-- Hanya boleh baca/kirim pesan jika user adalah bagian dari Match tersebut
create policy "Users can view messages in their match" on public.messages for select 
using (exists (select 1 from public.matches where id = match_id and (buyer_id = auth.uid() or seller_id = auth.uid())));
create policy "Users can send messages in their match" on public.messages for insert 
with check (exists (select 1 from public.matches where id = match_id and (buyer_id = auth.uid() or seller_id = auth.uid())));

-- ==============================================================================
-- 8. COMPLIANCE DOCUMENTS (DOKUMEN & AI CHECK)
-- Tempat AI "Compliance Officer" bekerja
-- ==============================================================================
create table public.compliance_documents (
  id uuid default gen_random_uuid() primary key,
  match_id uuid references public.matches(id) not null,
  uploader_id uuid references public.profiles(id) not null,
  document_type text not null, -- Invoice, Packing List, COO, Phytosanitary, Bill of Lading
  file_url text not null, -- Link file di Supabase Storage
  status doc_status default 'pending',
  ai_analysis_result jsonb, -- Hasil scan AI: {"score": 90, "issues": ["Weight mismatch"], "extracted_data": {...}}
  ai_feedback text, -- Pesan text untuk user: "Berat di invoice beda dengan packing list"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.compliance_documents enable row level security;
create policy "Users can view docs in their match" on public.compliance_documents for select 
using (exists (select 1 from public.matches where id = match_id and (buyer_id = auth.uid() or seller_id = auth.uid())));
create policy "Users can upload docs in their match" on public.compliance_documents for insert 
with check (exists (select 1 from public.matches where id = match_id and (buyer_id = auth.uid() or seller_id = auth.uid())));

-- ==============================================================================
-- 9. FUNCTIONS & TRIGGERS (EMAIL/PASSWORD AUTOMATION)
-- ==============================================================================

-- Trigger: Otomatis buat profil publik saat User Sign Up (Email/Password)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email, role)
  values (
    new.id, 
    -- Ambil dari metadata jika dikirim saat signup, jika tidak biarkan null dulu
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    new.email,
    -- Ambil role dari metadata, default ke 'seller' jika tidak ada (meskipun harusnya ada)
    COALESCE(new.raw_user_meta_data->>'role', 'seller')::user_role
  );
  return new;
end;
$$ language plpgsql security definer;

-- Mengaktifkan Trigger pada tabel auth.users
-- Drop dulu jika ada (untuk safety saat reset db)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger: Update kolom 'updated_at' otomatis
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles for each row execute procedure update_updated_at_column();