-- ============================================================
-- VFuture V5 – Supabase Schema
-- Chạy toàn bộ file này trong Supabase SQL Editor
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- BẢNG DỮ LIỆU
-- ============================================================

-- Bảng users (đồng bộ với auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null check (role in ('admin', 'senior_admin', 'editor')) default 'editor',
  views integer not null default 0,
  created_at timestamptz not null default now()
);

-- Bảng events
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  start_date timestamptz not null,
  end_date timestamptz not null,
  image_url text not null,
  thumbnail_url text,
  link text,
  status text not null check (status in ('active', 'upcoming', 'expired')) default 'upcoming',
  created_at timestamptz not null default now()
);

-- Bảng news
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover text not null,
  category text not null default 'ESPORTS',
  status text not null check (status in ('draft', 'published')) default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Bảng gallery
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  tag text not null,
  created_at timestamptz not null default now()
);

-- Bảng settings (key-value config)
create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  updated_at timestamptz not null default now()
);

-- Bảng admin_activity_logs
create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_email text not null,
  action text not null,
  target_type text not null,
  target_id text,
  summary text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists users_role_idx on public.users(role);
create index if not exists events_start_date_idx on public.events(start_date);
create index if not exists events_status_idx on public.events(status);
create index if not exists news_slug_idx on public.news(slug);
create index if not exists news_status_idx on public.news(status);
create index if not exists news_created_at_idx on public.news(created_at desc);
create index if not exists gallery_created_at_idx on public.gallery(created_at desc);
create index if not exists settings_updated_at_idx on public.settings(updated_at desc);
create index if not exists admin_activity_logs_created_at_idx on public.admin_activity_logs(created_at desc);

-- ============================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================

-- Tự động tạo user trong public.users khi đăng ký tài khoản mới
-- Gán role = 'senior_admin' nếu email là blazehunter01062008@gmail.com
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  user_role text;
begin
  -- Kiểm tra nếu email là admin chính
  if new.email = 'blazehunter01062008@gmail.com' then
    user_role := 'senior_admin';
  else
    -- Lấy role từ app metadata hoặc mặc định là editor
    user_role := coalesce(new.raw_app_meta_data ->> 'role', 'editor');
  end if;

  insert into public.users (id, email, role)
  values (new.id, new.email, user_role)
  on conflict (id) do update
    set email = excluded.email,
        role = excluded.role;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Tự động cập nhật updated_at khi news thay đổi
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_news_updated on public.news;
create trigger on_news_updated
before update on public.news
for each row execute function public.handle_updated_at();

drop trigger if exists on_settings_updated on public.settings;
create trigger on_settings_updated
before update on public.settings
for each row execute function public.handle_updated_at();

-- ============================================================
-- BẬT ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table public.users enable row level security;
alter table public.events enable row level security;
alter table public.news enable row level security;
alter table public.gallery enable row level security;
alter table public.settings enable row level security;
alter table public.admin_activity_logs enable row level security;

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Hàm helper: Gán role senior_admin cho user
-- Cách dùng: SELECT promote_to_senior_admin('blazehunter01062008@gmail.com');
create or replace function public.promote_to_senior_admin(target_email text)
returns table(success boolean, message text) as $$
declare
  user_uuid uuid;
  affected_rows integer;
begin
  -- Tìm UUID từ auth.users
  select id into user_uuid from auth.users where email = target_email;
  
  if user_uuid is null then
    return query select false::boolean, 'User không tồn tại trong auth.users. Tạo user trong Supabase Auth trước!'::text;
    return;
  end if;
  
  -- Gán role senior_admin
  update public.users 
  set role = 'senior_admin' 
  where id = user_uuid;
  
  affected_rows := found::integer::integer;
  
  if affected_rows > 0 then
    return query select true::boolean, 'Đã gán role senior_admin cho ' || target_email::text;
  else
    -- Nếu user chưa có trong public.users, tạo mới
    insert into public.users (id, email, role) 
    values (user_uuid, target_email, 'senior_admin');
    return query select true::boolean, 'Đã tạo user ' || target_email || ' với role senior_admin'::text;
  end if;
end;
$$ language plpgsql security definer;

-- ============================================================
-- HÀM KIỂM TRA QUYỀN
-- ============================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role in ('admin', 'senior_admin')
  );
$$;

create or replace function public.is_senior_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role = 'senior_admin'
  );
$$;

create or replace function public.is_admin_or_editor()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role in ('admin', 'senior_admin', 'editor')
  );
$$;

-- ============================================================
-- POLICIES – EVENTS
-- ============================================================

drop policy if exists "Public can view events" on public.events;
create policy "Public can view events"
on public.events
for select
using (true);

drop policy if exists "Admin/editor manage events" on public.events;
create policy "Admin/editor manage events"
on public.events
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

-- ============================================================
-- POLICIES – NEWS
-- ============================================================

drop policy if exists "Public can view published news" on public.news;
create policy "Public can view published news"
on public.news
for select
using (status = 'published' or public.is_admin_or_editor());

drop policy if exists "Admin/editor manage news" on public.news;
create policy "Admin/editor manage news"
on public.news
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

-- ============================================================
-- POLICIES – GALLERY
-- ============================================================

drop policy if exists "Public can view gallery" on public.gallery;
create policy "Public can view gallery"
on public.gallery
for select
using (true);

drop policy if exists "Admin/editor manage gallery" on public.gallery;
create policy "Admin/editor manage gallery"
on public.gallery
for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

-- ============================================================
-- POLICIES – USERS
-- ============================================================

-- Mỗi user tự đọc profile của mình
drop policy if exists "User can read own profile" on public.users;
create policy "User can read own profile"
on public.users
for select
using (id = auth.uid());

-- Admin xem và quản lý tất cả users
drop policy if exists "Admin manage users" on public.users;
create policy "Admin manage users"
on public.users
for all
using (public.is_admin())
with check (public.is_admin());

-- ============================================================
-- POLICIES – SETTINGS
-- ============================================================

-- Bất kỳ ai cũng có thể đọc settings công khai (SEO, background, v.v.)
drop policy if exists "Public can read settings" on public.settings;
create policy "Public can read settings"
on public.settings
for select
using (true);

-- Chỉ admin mới được sửa settings
drop policy if exists "Admin manage settings" on public.settings;
create policy "Admin manage settings"
on public.settings
for all
using (public.is_admin())
with check (public.is_admin());

-- ============================================================
-- POLICIES – ADMIN ACTIVITY LOGS
-- ============================================================

drop policy if exists "Admin/editor view logs" on public.admin_activity_logs;
create policy "Admin/editor view logs"
on public.admin_activity_logs
for select
using (public.is_admin_or_editor());

drop policy if exists "Admin/editor insert logs" on public.admin_activity_logs;
create policy "Admin/editor insert logs"
on public.admin_activity_logs
for insert
with check (public.is_admin_or_editor());

drop policy if exists "Admin manage log cleanup" on public.admin_activity_logs;
create policy "Admin manage log cleanup"
on public.admin_activity_logs
for delete
using (public.is_admin());

-- ============================================================
-- DỮ LIỆU MẶC ĐỊNH (SEED DATA)
-- ============================================================

-- ============================================================
-- SEED INITIAL ADMIN USER (BLAZEHUNTER01062008@GMAIL.COM)
-- ============================================================
-- ⚠️ FOREIGN KEY CONSTRAINT ENFORCED:
--    public.users.id MUST reference a real UUID from auth.users
--
-- ✅ CORRECT WORKFLOW:
--
-- STEP 1: Create user in Supabase Auth Dashboard
--   Location: https://supabase.com/dashboard
--   1. Go to Authentication > Users
--   2. Click "Add user"
--   3. Email: blazehunter01062008@gmail.com
--   4. Password: [strong password]
--   5. Click "Create user"
--
-- STEP 2: Copy REAL UUID from the new user
--   - Click on the user row
--   - Find "User UID" field
--   - Click copy icon (⎘) next to the UUID
--   - UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
--
-- STEP 3A: Use trigger (AUTOMATIC)
--   - Trigger will AUTO assign senior_admin role
--   - No SQL needed!
--
-- STEP 3B: Use helper function (if trigger fails)
--   SELECT promote_to_senior_admin('blazehunter01062008@gmail.com');
--
-- ⚠️ COMMON ERRORS:
--   
--   ERROR: "is not present in table 'users'"
--   → You used a FAKE UUID (like the example 550e8400-e29b...)
--   → Get the REAL UUID from Supabase Auth dashboard
--   
--   ERROR: "null value in column id"
--   → You forgot to create user in auth.users first
--   → Create user in Supabase Auth BEFORE running SQL
--
-- ✅ VERIFY SUCCESS:
--   SELECT id, email, role FROM public.users 
--   WHERE email = 'blazehunter01062008@gmail.com';
--
-- Expected output:
--   id                                   | email                          | role
--   ----+--------------------+-----+-----+-----+----+---+---+----+---+---- | ---
--   550e8400-e29b-41d4-a716-446655440000 | blazehunter01062008@gmail.com  | senior_admin

insert into public.settings (key, value)
values
  ('seo.default_title', 'VFuture'),
  ('seo.default_description', 'Fan-made gaming community hub for Free Fire events, news and gallery'),
  ('home.hero.title', 'VFuture'),
  ('home.background.desktop_urls', 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/20263/697b5d2e34ac088f5b5a4427d57f6281.jpg'),
  ('home.background.mobile_urls', 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/20263/0680c1792156b8a80095c669520f019a.jpg'),
  ('home.background.interval_seconds', '5'),
  ('home.background.transition_seconds', '1'),
  ('home.background.transition_effect', 'fade'),
  ('social.email', 'blazehunter01062008@gmail.com'),
  ('news.categories', 'ESPORTS\nPATCH NOTE\nCỘNG ĐỒNG'),
  ('analytics.views', '0'),
  ('site.description', 'Mạng lưới cộng đồng số 1 về cung cấp thông tin, theo dõi sự kiện và các nội dung từ Garena Free Fire Việt Nam.')
on conflict (key) do nothing;
