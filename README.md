# 🎮 VFuture - Nền Tảng CMS & Cộng Đồng Game Hiện Đại

**© 2026 Veltrix Media Group. All Rights Reserved.**

Dự án VFuture là nền tảng tối ưu hóa hiệu suất cao (High-Performance CMS) dành cho cộng đồng game, được xây dựng trên Next.js 14 App Router và Supabase. Hệ thống được thiết kế để chịu tải lớn, bảo mật cao và quản lý nội dung dễ dàng.

---

## 🌳 Kiến Trúc Rễ Cây (System Architecture Tree)

Để hiểu rõ cơ chế vận hành của VFuture, cấu trúc hệ thống được chia thành các "Rễ" (Layers) khác nhau, từ tầng giao diện người dùng đến tầng cơ sở dữ liệu.

```mermaid
graph TD
    User((Người dùng/Bot)) --> |Truy cập HTTP/HTTPS| Edge[Vercel Edge Network]
    
    subgraph "Tầng Edge & Bảo Mật (Vercel + Middleware)"
        Edge --> WAF[Web Application Firewall (DDoS Protection)]
        WAF --> Middleware[Next.js Middleware (rate-limit.ts)]
        Middleware --> |Bảo vệ API & Chống Scraping| Router[Next.js App Router]
    end
    
    subgraph "Tầng Ứng Dụng (Next.js Frontend & Backend)"
        Router --> |Trang Công Khai| Frontend[Public Pages (Home, News, Events)]
        Router --> |Trang Quản Trị| Admin[Admin Dashboard (/admin)]
        Router --> |Xử Lý Dữ Liệu| API[API Routes (/api)]
        
        Frontend --> |캐/ISR Cache (60s)| Cache[(Vercel Data Cache)]
        Cache -.-> |Miss| Service[Content Service (Supabase Fetcher)]
        Cache --> |Hit: Mượt mà, 0s| Frontend
        
        Admin --> |Kiểm tra Quyền| AuthCheck[Supabase SSR Auth]
    end
    
    subgraph "Tầng Dữ Liệu (Supabase BaaS)"
        Service --> |Truy vấn DB| DB[(PostgreSQL Database)]
        DB --> |RLS Policies| Tables(users, events, news, gallery, settings)
        
        AuthCheck --> |Xác thực| Auth[(Supabase Auth)]
        Auth --> |Gửi Email OTP| SMTP[Gmail SMTP Server]
    end
```

### ⚙️ Cơ Chế Vận Hành Chi Tiết
1. **Lưu Lượng Công Khai (Public Traffic)**: Khi người dùng truy cập trang chủ, hệ thống sử dụng **ISR (Incremental Static Regeneration)** (`revalidate = 60`). Trang web sẽ tải siêu nhanh từ Cache của Vercel mà không cần gọi Database, giúp hệ thống chịu được hàng trăm ngàn truy cập cùng lúc mà không sập.
2. **Bảo Mật API**: Tích hợp thuật toán chặn Rate Limit chống quét dữ liệu (Data Scraping) và spam API.
3. **Quản Trị (Admin)**: Mọi thao tác truy cập `/admin` đều bị chặn ở Middleware, bắt buộc phải có Token hợp lệ từ Supabase và Role là `admin` hoặc `editor`.

---

## 🚀 Hướng Dẫn Deploy Dự Án Lên Github & Vercel

Bước này rất quan trọng để đưa website chạy thực tế với tên miền `vfuture.vercel.app`.

### Phần 1: Các File & Thư Mục Cần Đưa Lên Github
Bạn **CẦN ĐƯA LÊN (Push)** toàn bộ dự án, **NGOẠI TRỪ** các file nhạy cảm và file tự sinh ra. Hệ thống đã có sẵn file `.gitignore` để tự động loại trừ, cụ thể:
- ❌ **KHÔNG đưa lên**: `.env.local` (Chứa API key mật), `node_modules/` (Rất nặng), `.next/` (File đã build).
- ✅ **ĐƯA LÊN**: Balo gồm `src/`, `public/`, `supabase/`, `package.json`, `next.config.mjs`, `middleware.ts`, `tailwind.config.ts`, `components.json`, `.eslintrc.json`, v.v.

**Các bước đưa lên Github:**
1. Mở Terminal (PowerShell hoặc Git Bash) tại thư mục dự án.
2. Gõ các lệnh sau:
   ```bash
   git init
   git add .
   git commit -m "Bản phát hành VFuture V5 - Hoàn thiện bảo mật và hiệu suất"
   git branch -M main
   git remote add origin https://github.com/Tên-Github-Của-Bạn/vfuture.git
   git push -u origin main
   ```

### Phần 2: Deploy Trên Vercel (vfuture.vercel.app)

1. Đăng nhập vào [Vercel.com](https://vercel.com) bằng tài khoản Github của bạn.
2. Nhấn nút **Add New** > **Project**.
3. Chọn Repository `vfuture` mà bạn vừa push lên Github và nhấn **Import**.
4. **THIẾT LẬP BIẾN MÔI TRƯỜNG (CỰC KỲ QUAN TRỌNG)**:
   - Trong mục **Environment Variables**, bạn hãy mở file `.env.local` ở máy tính của bạn, copy TỪNG DÒNG (Name và Value) và Paste vào Vercel.
   - Các biến bắt buộc phải có: 
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_SITE_URL=https://vfuture.vercel.app` (Lưu ý URL này)
5. Nhấn **Deploy** và chờ khoảng 2-3 phút.
6. Khi hoàn tất, hệ thống sẽ tự cấp tên miền cho bạn (nếu tên miền `vfuture.vercel.app` chưa có ai đăng ký trên Vercel, bạn có thể chỉnh sửa trong phần **Settings > Domains**).

---

## ✉️ Lưu Ý Về Gửi Email (Quên Mật Khẩu)

Mục **Quên Mật Khẩu** sử dụng Supabase Auth kết hợp SMTP của Gmail. 
- **Trên Localhost (`http://localhost:3000`)**: Nếu bạn gửi email báo lỗi hoặc không nhận được thư, hãy kiểm tra **Supabase Dashboard > Authentication > URL Configuration > Redirect URLs** và thêm `http://localhost:3000/**` vào danh sách cho phép.
- **Trên Vercel**: Khi đã deploy thành công, bạn phải vào lại Supabase Dashboard và thêm URL `https://vfuture.vercel.app/**` vào mục Redirect URLs, nếu không email khôi phục mật khẩu sẽ không thể gửi khi website chạy thực tế.

---

## 🛡️ Tổng Quan Bảo Mật Dữ Liệu
Web đã được tinh chỉnh để:
1. **Chống SQL Injection & XSS**: Bằng Prisma/Supabase Client và input validation.
2. **Chống Data Scraping / DDoS**: Next.js Middleware và API Guards có bộ giới hạn tốc độ (Rate Limit) quét dọn tự động bộ nhớ, kết hợp tường lửa Vercel (WAF).
3. **An toàn Server**: Cookie được bảo vệ bởi cờ `HttpOnly` và Header chuẩn quốc tế trong `next.config.mjs` (CSP, HSTS). Tốc độ tải trang dưới 0.3s (TTFB) giúp tiết kiệm tài nguyên database tối đa.
