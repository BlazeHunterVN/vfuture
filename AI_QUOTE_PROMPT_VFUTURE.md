# Prompt Bao Gia Website VFuture

Tai lieu nay gom 2 phan:

1. Phan tich tom tat codebase hien tai de AI hieu dung san pham.
2. Prompt san sang copy/paste de dua cho AI bao gia website chinh xac hon.

Luu y:
- Day la website cong dong game fan-made theo huong Free Fire community hub.
- Day khong phai project landing page don gian, ma la mot nen tang content + event + CMS admin + Supabase backend.
- Khong dua secret, API key, password that, connection string, service role key vao prompt bao gia.

---

## 1. Phan Tich Tom Tat Du An Hien Tai

### 1.1 Muc tieu san pham

Website ten: `VFuture`

Muc tieu:
- Xay dung mot website cong dong game fan-made chuyen nghiep.
- Tap trung vao 3 lop gia tri chinh:
  - lich/timeline su kien
  - tin tuc/bai viet
  - gallery/hinh anh cong dong
- Co he thong Admin CMS de quan tri toan bo noi dung.
- Backend dung Supabase de phuc vu Auth, Database, Storage.
- Deploy theo huong production len Vercel.

Tinh chat san pham:
- Website cong dong game co tinh thoi gian thuc theo mui gio Viet Nam.
- Co giao dien sang/toi.
- Co yeu cau SEO Google, bao mat, hieu nang, va kha nang chiu luu luong lon.

---

### 1.2 Cong nghe va kien truc tong the

Frontend / Fullstack framework:
- Next.js 14 `App Router`
- React 18
- TypeScript

UI / Styling:
- Tailwind CSS
- shadcn/ui
- class-variance-authority
- tailwind-merge
- Lucide icons
- next-themes cho light/dark mode
- Framer Motion cho animation
- Lottie (`lottie-react`) cho animation trang dang nhap admin

State management:
- TanStack React Query cho fetch/cache/refetch
- Zustand cho UI state cuc bo, vi du filter/search/modal event

Form / Validation:
- React Hook Form
- Zod
- @hookform/resolvers

Editor / Rich content:
- TipTap da co trong dependencies
- Hien tai form tin tuc da toi gian, nhung he thong van co nang luc mo rong rich text

Backend:
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- @supabase/ssr
- @supabase/supabase-js

SEO:
- Next Metadata API
- next-seo (JSON-LD Organization/Event)
- sitemap.xml
- robots.txt
- Open Graph / Twitter card

Deployment:
- Vercel

Bao mat va xu ly du lieu:
- sanitize-html
- custom sanitize plain text cho API
- rate limit tu viet cho API
- RBAC admin/editor
- Supabase RLS

Tien ich build/deploy:
- script ensure build id
- script ensure admin user trong Supabase

---

### 1.3 Cau truc thu muc chinh

Codebase duoc to chuc theo huong module ro rang:

- `src/app`
  - route public site
  - route admin
  - route auth
  - route API
  - `layout.tsx`, `robots.ts`, `sitemap.ts`, `loading.tsx`, `error.tsx`

- `src/components`
  - `home`
  - `events`
  - `news`
  - `timeline`
  - `contact`
  - `layout`
  - `admin`
  - `auth`
  - `ui`
  - `common`

- `src/lib`
  - `data` service layer
  - `server` security/rate-limit/sanitize
  - `supabase` clients
  - `utils`
  - `validators`
  - `constants`
  - `types`

- `src/store`
  - Zustand store cho event UI

- `supabase`
  - `schema.sql`

- `scripts`
  - build/deploy/admin utilities

- `public/branding`
  - favicon, logo brand assets

Ngoai ra co thu muc:
- `WEBSITE_FF_NEW_V4_CU`
  - dung nhu kho tai nguyen/giao dien tham chieu cu

---

### 1.4 Cac route public hien tai

Route public chinh:
- `/` : Trang chu
- `/calendar` : Timeline lich su kien
- `/events` : Danh sach su kien dang/grid
- `/news` : Danh sach tin tuc
- `/news/[slug]` : Trang chi tiet tin tuc
- `/contact` : Trang lien he
- `/privacy-policy` : Chinh sach bao mat
- `/terms-of-use` : Dieu khoan su dung

Legacy redirect routes van ton tai:
- `/lich` -> `/calendar`
- `/su-kien` -> `/events`
- `/tin-tuc` -> `/news`
- `/lien-he` -> `/contact`
- `/chinh-sach-bao-mat` -> `/privacy-policy`
- `/dieu-khoan-su-dung` -> `/terms-of-use`

---

### 1.5 Tinh nang frontend public site

#### A. Navbar / Global layout
- Navbar sticky/fixed top.
- Ho tro mobile menu.
- Dark mode / light mode.
- Active menu highlight.
- Logo doi theo theme.
- Co footer, legal pages, social links.

#### B. Trang chu
- Hero slider/background full width-full height.
- Ho tro toi da:
  - 3 anh desktop
  - 3 anh mobile
- Cho phep chon hieu ung transition:
  - fade
  - zoom
  - slide
- Cho phep chon:
  - so giay doi anh
  - so giay transition
- Chi lam mo nhe phan day slider/banner.
- Co block thong ke:
  - su kien dang dien ra
  - bai viet da dang
  - he thong san sang 24/7
- Co cac section:
  - Su kien noi bat
  - Tin tuc moi nhat
  - Gallery/community moments
  - CTA tham gia cong dong
- Hien tai cac section home lay 3 item moi nhat.

#### C. Calendar / Timeline su kien
- Timeline ngang theo ngay/thang.
- Muc tieu UX la xem duoc event bar keo dai theo khoang ngay.
- Co:
  - search theo ten su kien
  - filter status
  - loc tu ngay / den ngay
- Event click mo modal chi tiet.
- Status tu dong theo mui gio Viet Nam:
  - upcoming
  - active
  - expired
- Khong can admin nhap tay status chay thoi gian.
- Tinh toan theo `Asia/Ho_Chi_Minh`.

#### D. Trang su kien
- Hien thi dang grid card.
- Filter/search.
- Hien event theo logic thang hien tai va cua so thoi gian lien quan.
- Status hien tren card.
- Click card mo modal chi tiet.

#### E. Trang tin tuc
- Listing tin tuc.
- Category filter.
- Trang chi tiet theo `slug`.
- Metadata/SEO cho tin tuc.

#### F. Trang lien he
- Social links.
- Email mo Gmail compose.
- Contact form co validation + toast.
- API contact co sanitize + rate limit.

#### G. Giao dien / Motion / Theming
- Co 2 giao dien:
  - Light mode
  - Dark mode
- Dark mode duoc dinh huong theo phong cach:
  - premium
  - glow
  - orange/gold luminescent
  - technical/gaming/high-contrast
- Light mode duoc dinh huong:
  - clean
  - modern
  - blue gradient accent
  - de doc, de dung, nhat quan
- Responsive desktop/mobile.
- Su dung animation cho:
  - navbar/mobile menu
  - slider transition
  - hover states
  - modal
  - login animation

---

### 1.6 Tinh nang admin CMS hien tai

Route admin:
- `/admin`
- `/admin/events`
- `/admin/news`
- `/admin/gallery`
- `/admin/users`
- `/admin/settings`

#### A. Dashboard
- The hien:
  - tong users
  - tong events
  - tong news
  - tong views
- Co panel:
  - admin dang hoat dong thoi gian thuc

#### B. Quan ly su kien
- CRUD su kien
- Form su kien hien tai co:
  - tieu de
  - ngay bat dau
  - ngay ket thuc
  - anh su kien
  - external link optional
- Status duoc suy ra tu dong theo ngay, khong phai field dieu khien chinh.

#### C. Quan ly tin tuc
- CRUD tin tuc
- Form tin tuc da toi gian theo huong giong su kien:
  - tieu de
  - ngay dang
  - anh tin tuc
  - category
- He thong tu tao slug va content fallback.
- Category co the:
  - chon tu danh sach
  - them moi
  - xoa category
- Category duoc luu trong settings (`news.categories`).

#### D. Quan ly gallery
- Them anh gallery bang URL hoac upload len storage.
- Tag anh.
- Xoa anh.

#### E. Quan ly user
- Role:
  - admin
  - editor
- Co invited emails manager.
- Tu duy bao mat:
  - chi email duoc moi moi co the tao tai khoan

#### F. Cai dat he thong
- Quan ly title SEO mac dinh.
- Quan ly hero title.
- Quan ly slider background desktop/mobile.
- Quan ly transition effect / interval / transition duration.
- Quan ly social links va email lien he.
- Bat/tat experimental mode.

#### G. Auth admin
- Dang nhap email/password voi Supabase Auth.
- Dang nhap Google OAuth.
- Demo admin login khong can Supabase.
- Lottie state machine cho login:
  - lock
  - loading
  - check
  - wrong
- Register theo email duoc moi.
- Logout.

#### H. Theo doi admin dang hoat dong
- Co heartbeat/presence trong admin.
- Hien danh sach admin dang hoat dong gan day.
- Window theo doi hien tai la 90 giay.

---

### 1.7 Database va mo hinh du lieu Supabase

Bang chinh:

#### `users`
- `id`
- `email`
- `role` (`admin` | `editor`)
- `views`
- `created_at`

#### `events`
- `id`
- `title`
- `description`
- `start_date`
- `end_date`
- `image_url`
- `thumbnail_url`
- `link`
- `status` (`active` | `upcoming` | `expired`) - hien tai duoc tinh logic/normalize tren app
- `created_at`

#### `news`
- `id`
- `title`
- `slug`
- `excerpt`
- `content`
- `cover`
- `category`
- `status` (`draft` | `published`)
- `created_at`

#### `gallery`
- `id`
- `image_url`
- `tag`
- `created_at`

#### `settings`
- `id`
- `key`
- `value`
- `updated_at`

Storage bucket du kien:
- `events`
- `gallery`

Schema co:
- indexes
- trigger `handle_new_user`
- RLS policies
- function `is_admin()`
- function `is_admin_or_editor()`

---

### 1.8 Bao mat hien tai va yeu cau production

Bao mat da co trong code:
- Middleware chan `/admin` neu chua auth.
- Demo admin auth cho local/test.
- RBAC admin/editor.
- API admin auth guard.
- Rate limit cho API.
- Sanitize input.
- CSP va security headers:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
  - COOP/CORP
  - HSTS
- Robots chan `/admin` va `/api/admin`.
- Supabase RLS.

Cac diem can tinh vao bao gia neu lam production day du:
- hardening auth va permission matrix
- audit route protection
- bot protection / abuse protection
- logging/monitoring
- backup & restore strategy
- brute-force protection
- email service cho reset password/OTP neu can

---

### 1.9 SEO, hieu nang, kha nang scale

SEO da co:
- Metadata API
- Open Graph
- Twitter card
- Sitemap
- Robots
- JSON-LD Organization
- JSON-LD Event
- News route theo slug
- Canonical URL

Hieu nang da co hoac dang dinh huong:
- Next.js App Router
- route-based code splitting
- `next/image`
- revalidate cho home
- React Query cache
- fallback read neu Supabase cham/timeout

Yeu cau de AI bao gia can tinh them:
- toi uu PageSpeed
- SSR/ISR/CSR mix hop ly
- cache strategy Vercel + Supabase
- toi uu image/CDN
- toi uu truy van DB/index
- kha nang chiu luu luong lon
- kha nang mo rong them module trong tuong lai

---

### 1.10 Deploy, van hanh, moi truong

Deploy target:
- Vercel

Backend:
- Supabase

Can co bien moi truong:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- feature flags cho experimental/demo auth

Tien ich he thong:
- script tao/ensure admin user
- script build id

Domain:
- domain hien tai: `https://vfuture.vercel.app`
- domain production: `https://vfuture.vercel.app`

---

### 1.11 Ghi chu quan trong de bao gia chinh xac

Day la bai toan bao gia cho:
- mot website cong dong game co giao dien custom
- co CMS admin
- co Supabase backend
- co role-based auth
- co SEO
- co settings dong
- co timeline event custom
- co yeu cau responsive + theme system + animation + security + deploy

Khong nen bao gia nhu website doanh nghiep gioi thieu don gian.

Can tach it nhat 2 kich ban khi bao gia:
- Kich ban A: xay moi tu dau
- Kich ban B: tiep tuc hoan thien tren codebase Next.js/Supabase hien co

Can neu ro:
- phan nao da co san trong codebase
- phan nao can hoan thien them de dat production-ready

---

## 2. Prompt San Sang De Dua Cho AI Bao Gia

Ban co the copy nguyen khung duoi day:

```text
Ban dong vai tro la CTO, Solution Architect, Technical PM va Agency Estimator chuyen bao gia chinh xac cho cac du an web app custom. Toi can ban bao gia mot website cong dong game fan-made ten la VFuture dua tren thong tin codebase va pham vi tinh nang duoi day.

Yeu cau:
- Khong bao gia chung chung.
- Hay phan tich do phuc tap thuc te cua he thong.
- Hay bao gia theo 2 kich ban:
  1. Xay moi tu dau.
  2. Tiep tuc hoan thien tren codebase Next.js + Supabase hien co.
- Hay tach ro chi phi theo tung hang muc.
- Hay neu ro phan nao da co trong codebase va phan nao can lam them de dat muc production-ready.
- Hay cho toi bang uoc tinh theo VND va co the them USD neu can.
- Hay cho toi timeline thuc hien theo tuan.
- Hay neu ro assumption, risk, dependency, out-of-scope.
- Hay danh gia theo muc do can nhieu nhan su nao: PM, UI/UX, Frontend, Backend, DevOps, QA.

Thong tin du an:

1. Tong quan san pham
- Day la website cong dong game fan-made theo phong cach gaming / Free Fire community hub.
- San pham khong phai landing page don gian, ma la mot platform gom:
  - public website
  - admin CMS
  - Supabase backend
  - SEO
  - role-based auth
  - dynamic settings
  - timeline su kien custom
- Muc tieu la khi deploy len production van phai muot, co the scale, de SEO Google va du an co tinh chat chuyen nghiep.

2. Tech stack hien tai
- Next.js 14 App Router
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Lottie
- React Query
- Zustand
- React Hook Form + Zod
- Supabase Auth + Database + Storage
- next-seo + Metadata API
- Vercel deployment
- sanitize-html

3. Cau truc tong the
- Public site routes:
  - /
  - /calendar
  - /events
  - /news
  - /news/[slug]
  - /contact
  - /privacy-policy
  - /terms-of-use
- Admin routes:
  - /admin
  - /admin/events
  - /admin/news
  - /admin/gallery
  - /admin/users
  - /admin/settings
- Auth routes:
  - /auth/login
  - /auth/register
  - /auth/callback
- API routes cho public + admin.

4. Public site features

4.1 Trang chu
- Hero slider full width/full height.
- Cho phep toi da 3 anh desktop va 3 anh mobile.
- Configurable slider:
  - chon hieu ung fade / zoom / slide
  - chon so giay doi anh
  - chon so giay transition
- Background chi mo nhe o chan duoi.
- Co thong ke:
  - su kien dang dien ra
  - bai viet da dang
  - he thong san sang 24/7
- Co section:
  - featured events
  - latest news
  - gallery/community moments
  - CTA
- Hien 3 item moi nhat o moi section.

4.2 Trang calendar
- Timeline su kien custom ngang theo ngay/thang.
- Event hien dang bar keo dai theo khoang ngay.
- Search event theo ten.
- Filter status.
- Loc tu ngay / den ngay.
- Click event mo modal chi tiet.
- Hien status theo thoi gian thuc.
- Status phai tu dong cap nhat theo mui gio Viet Nam:
  - Upcoming
  - Active
  - Expired

4.3 Trang events
- Grid card su kien.
- Search/filter.
- Hien event theo logic cua thang hien tai.
- Card click mo modal chi tiet.
- External link optional.

4.4 Trang news
- Listing bai viet.
- Category filter.
- Chi tiet bai viet theo slug.
- SEO cho tung bai viet.

4.5 Trang contact
- Social links.
- Email mo Gmail compose.
- Contact form co validation + toast.
- API contact co sanitize va rate limit.

4.6 Legal pages
- Privacy Policy.
- Terms of Use.

5. Admin CMS features

5.1 Dashboard
- Tong users.
- Tong events.
- Tong news.
- Tong views.
- Panel admin dang hoat dong thoi gian thuc.

5.2 Event management
- CRUD su kien.
- Form gom:
  - title
  - start date
  - end date
  - image
  - external link optional
- Status duoc suy ra tu dong theo ngay, khong can admin chinh tay.

5.3 News management
- CRUD tin tuc.
- Form duoc toi gian giong event form.
- Gom:
  - title
  - publish date
  - cover image
  - category
- Category co the:
  - chon tu danh sach
  - them moi
  - xoa category
- He thong tu tao slug va du lieu fallback can thiet.

5.4 Gallery manager
- Them anh bang URL hoac upload storage.
- Gan tag.
- Xoa anh.

5.5 User management
- User roles:
  - admin
  - editor
- Invited email allowlist de tang bao mat khi tao tai khoan.

5.6 Settings
- Hero title.
- Slider desktop images.
- Slider mobile images.
- Slider effect.
- Slider interval.
- Slider transition duration.
- SEO default title.
- Experimental mode on/off.
- Social links.
- Contact email.

5.7 Auth admin
- Login bang email/password voi Supabase Auth.
- Login bang Google OAuth.
- Demo login khong can Supabase.
- Trang login co animation Lottie:
  - lock
  - loading
  - check
  - wrong
- Register theo invited email.
- Logout.

6. UI/UX va giao dien
- Responsive desktop/mobile.
- Co light mode va dark mode.
- Dark mode theo huong premium technical glow, orange/gold accent, high-contrast.
- Light mode theo huong clean modern, blue gradient accent, de doc, de dung.
- Giao dien phai co tinh he thong, nhat quan, khong template generic.
- Co animation cho navbar, slider, modal, hover, theme switch, login states.
- Co timeline design custom, khong dung component co san don gian.

7. Database / Supabase
- Bang users: id, email, role, views, created_at
- Bang events: id, title, description, start_date, end_date, image_url, thumbnail_url, link, status, created_at
- Bang news: id, title, slug, excerpt, content, cover, category, status, created_at
- Bang gallery: id, image_url, tag, created_at
- Bang settings: id, key, value, updated_at
- Supabase Storage bucket:
  - events
  - gallery
- Co RLS policy.
- Co role helper functions.
- Co trigger tao user profile khi auth user duoc tao.

8. Bao mat can tinh vao bao gia
- Middleware protect route admin.
- RBAC admin/editor.
- API auth guard.
- Rate limit cho contact va admin APIs.
- Input sanitization.
- Security headers:
  - CSP
  - X-Frame-Options
  - HSTS
  - Referrer-Policy
  - Permissions-Policy
  - COOP/CORP
- Supabase RLS.
- robots chan /admin va /api/admin.
- Neu can de production, hay tinh them chi phi cho:
  - bot protection
  - abuse prevention
  - audit permission matrix
  - monitoring/logging
  - backup & restore
  - reset password qua email OTP neu muon hoan thien tron ven

9. SEO va hieu nang
- Metadata API.
- Open Graph.
- Twitter card.
- Sitemap.
- Robots.
- JSON-LD Organization va Event.
- Dynamic news pages theo slug.
- Canonical.
- next/image.
- App Router.
- React Query cache.
- ISR/revalidate cho mot so trang.
- Can tinh them chi phi toi uu production:
  - PageSpeed
  - image optimization
  - cache strategy
  - database query/index optimization
  - performance under high traffic

10. Deployment va van hanh
- Deploy len Vercel.
- Backend la Supabase.
- Co env vars cho Supabase va feature flags.
- Co utility script tao admin user.
- Co utility script build id.
- Current domain: https://vfuture.vercel.app
- Production domain: https://vfuture.vercel.app

11. Yeu cau bao gia
Hay tra loi theo cau truc sau:

A. Danh gia tong quan
- Muc do phuc tap tong the.
- Loai san pham.
- Nhan dinh xem day la website, web app hay content platform + CMS.

B. Phan tich theo module
- Frontend public site
- Calendar/timeline custom
- News/blog system
- Contact + legal
- Admin CMS
- Auth + role management
- Supabase database + storage + RLS
- Settings engine
- SEO
- Security
- DevOps/deployment
- QA/UAT

C. Bao gia theo 2 kich ban
1. Xay moi tu dau
2. Tiep tuc hoan thien tren codebase hien co

Moi kich ban can co:
- Khoi luong cong viec
- Nhan su de xuat
- So gio hoac so ngay cong
- Khoang chi phi VND
- Khoang thoi gian trien khai

D. Tach chi phi chi tiet theo hang muc
Vi du:
- UI/UX design
- Frontend
- Backend
- Supabase schema/RLS/auth
- Admin CMS
- SEO
- Security hardening
- Testing/QA
- Deployment/DevOps
- Bao hanh sau ban giao

E. Chi phi van hanh hang thang
- Vercel
- Supabase
- Email service neu co
- Monitoring/logging neu co
- Domain / SSL neu co

F. Nhung phan da co trong codebase va co the tiet kiem chi phi
- Liet ke cu the.

G. Nhung phan chua hoan chinh neu muon production-ready can tinh them
- Liet ke cu the.

H. Risk va assumptions
- Gia dinh nao dang duoc dat ra de bao gia.
- Diem nao co the lam tang chi phi.

I. De xuat 3 muc bao gia neu co the
- MVP
- Standard Production
- Full Production / Premium

J. Ket luan
- Theo ban, muc bao gia hop ly nhat cho du an nay la bao nhieu neu lam nghiem tuc.

Hay bao gia that sat thuc te, khong bao gia kieu website gioi thieu co ban. Day la mot nen tang custom co CMS, auth, database, settings, SEO, security va timeline event rieng.
```

---

## 3. Goi y cach dung

Ban co the dua nguyen file nay cho AI khac va noi them:

- "Hay bao gia nhu mot san pham lam cho khach hang that."
- "Hay tich hop ca chi phi hoan thien phan production-ready."
- "Hay cho toi muc gia neu tiep tuc tren codebase Next.js/Supabase hien co."

Neu muon, co the yeu cau AI bao gia them theo:
- freelancer
- team nho 2-3 nguoi
- agency full service
