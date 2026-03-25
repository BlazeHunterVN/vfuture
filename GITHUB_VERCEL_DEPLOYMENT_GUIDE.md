# 🚀 Hướng Dẫn Deploy Website lên GitHub + Vercel

## 📋 Tổng Quan

Hướng dẫn chi tiết để deploy website VFuture lên GitHub và Vercel. Bao gồm các file cần thiết, file cần loại trừ, và các bước setup.

---

## 📁 Cấu Trúc File Cần Đưa Lên GitHub

### ✅ FILE VÀ THƯ MỤC CẦN ĐƯA LÊN

```
📦 WEBSITE_FF_NEW_V5_TEST - Sao chép/
├── 📄 .env.example                    # Template cho environment variables
├── 📄 .gitignore                      # File ignore patterns
├── 📄 next.config.mjs                 # Next.js configuration
├── 📄 package.json                    # Dependencies và scripts
├── 📄 package-lock.json               # Lock file cho dependencies
├── 📄 tailwind.config.ts              # Tailwind CSS config
├── 📄 tsconfig.json                   # TypeScript config
├── 📄 postcss.config.mjs              # PostCSS config
├── 📄 middleware.ts                   # Next.js middleware
├── 📄 next-env.d.ts                   # Next.js TypeScript types
├── 📄 README.md                       # Documentation
├── 📄 QUICK_START_DEPLOYMENT.md       # Quick start guide
├── 📄 DEPLOYMENT_SETUP.md             # Detailed setup guide
├── 📄 SECURITY_AUDIT.md               # Security documentation
├── 📄 GITHUB_VERCEL_COMPLETE_GUIDE.md # GitHub + Vercel guide
├── 📄 AI_QUOTE_PROMPT_VFUTURE.md      # AI prompt documentation
├── 📄 CONTRIBUTING.md                 # Contributing guidelines
├── 📄 LICENSE                         # License file
├── 📄 middleware.ts                   # Next.js middleware
├── 📁 public/                         # Static assets
│   └── 📁 branding/                   # Brand assets
├── 📁 scripts/                        # Build và setup scripts
│   ├── 📄 ensure-build-id.mjs
│   ├── 📄 ensure-supabase-admin.mjs
│   ├── 📄 quick-start.ps1
│   └── 📄 seed-ff-template.ps1
├── 📁 src/                            # Source code
│   ├── 📁 app/                        # Next.js app directory
│   ├── 📁 assets/                     # App assets
│   ├── 📁 components/                 # React components
│   ├── 📁 hooks/                      # Custom hooks
│   ├── 📁 lib/                        # Utilities và configs
│   └── 📁 types/                      # TypeScript types
├── 📁 supabase/                       # Database schema và seed
│   ├── 📄 schema.sql                  # Database schema
│   └── 📄 seed-data.sql               # Initial data
└── 📁 WEBSITE_FF_NEW_V4_CU/           # Legacy version (optional)
```

### ❌ FILE VÀ THƯ MỤC KHÔNG NỀN ĐƯA LÊN

```
📦 WEBSITE_FF_NEW_V5_TEST - Sao chép/
├── ❌ .env.local                      # Environment variables (có thông tin nhạy cảm)
├── ❌ .next/                          # Build output (tự động tạo lại)
├── ❌ node_modules/                   # Dependencies (tự động install)
├── ❌ .vercel/                        # Vercel deployment files
├── ❌ *.log                           # Log files
├── ❌ dev.err                         # Development error logs
├── ❌ server-latest.err               # Server error logs
└── ❌ .DS_Store                       # macOS system files
```

---

## 🛠️ Bước 1: Chuẩn Bị Code

### 1.1 Tạo File .env.example

Tạo file template cho environment variables:

```bash
# Tạo file .env.example
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 1.2 Kiểm Tra .gitignore

Đảm bảo file `.gitignore` có các pattern sau:

```
/.env.local
/.next/
/node_modules/
/.vercel/
/*.log
dev.err
server-latest.err
.DS_Store
```

### 1.3 Test Build Local

```bash
# Install dependencies
npm install

# Build project
npm run build

# Test production build
npm run start
```

---

## 📦 Bước 2: Tạo Repository GitHub

### 2.1 Tạo Repository Trên GitHub

1. Truy cập [https://github.com](https://github.com)
2. Click **"New repository"**
3. Điền thông tin:
   - **Repository name**: `vfuture-website` (hoặc tên bạn muốn)
   - **Description**: `VFuture Gaming Community CMS`
   - **Visibility**: `Private` (nếu code nhạy cảm) hoặc `Public`
4. **KHÔNG** check "Add a README file"
5. Click **"Create repository"**

### 2.2 Clone Repository Về Local

```bash
# Clone repository (thay YOUR_USERNAME và REPO_NAME)
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git

# Copy toàn bộ code vào thư mục repository
cp -r /path/to/your/project/* /path/to/repo/

# Hoặc move toàn bộ project vào thư mục repo
mv /path/to/your/project /path/to/repo/
cd /path/to/repo
```

### 2.3 Push Code Lên GitHub

```bash
# Thêm tất cả files
git add .

# Commit với message
git commit -m "Initial commit: VFuture website deployment"

# Push lên GitHub
git push -u origin main
```

---

## 🚀 Bước 3: Deploy Trên Vercel

### 3.1 Tạo Tài Khoản Vercel

1. Truy cập [https://vercel.com](https://vercel.com)
2. Đăng ký tài khoản (có thể dùng GitHub account)
3. Verify email

### 3.2 Import Project Từ GitHub

1. Click **"Add New..."** → **"Project"**
2. Chọn **"Import Git Repository"**
3. Chọn repository GitHub vừa tạo
4. Cấu hình project:

#### Build Settings:
- **Framework Preset**: `Next.js`
- **Root Directory**: `./` (hoặc đường dẫn nếu code không ở root)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default)

#### Environment Variables:
Thêm các biến sau (lấy từ Supabase Dashboard):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx...
```

### 3.3 Deploy

1. Click **"Deploy"**
2. Chờ Vercel build và deploy (khoảng 2-5 phút)
3. Khi thành công, bạn sẽ có URL: `https://your-project.vercel.app`

---

## ⚙️ Bước 4: Cấu Hình Environment Variables

### 4.1 Lấy Thông Tin Từ Supabase

1. Vào [https://app.supabase.com](https://app.supabase.com)
2. Chọn project
3. Vào **Settings** → **API**
4. Copy các thông tin:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 4.2 Thêm Vào Vercel

1. Vào Vercel Dashboard
2. Chọn project
3. Vào **Settings** → **Environment Variables**
4. Thêm từng biến:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxxxx...` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJxxxxx...` | Production |

5. **Redeploy** để áp dụng thay đổi

---

## 🗄️ Bước 5: Setup Database Supabase

### 5.1 Tạo Project Supabase

1. Vào [https://app.supabase.com](https://app.supabase.com)
2. Click **"New project"**
3. Điền thông tin:
   - **Name**: `vfuture-prod`
   - **Database Password**: Tạo mật khẩu mạnh
   - **Region**: Chọn gần nhất (Asia Southeast)

### 5.2 Import Database Schema

1. Vào **SQL Editor** trong Supabase
2. Copy nội dung file `supabase/schema.sql`
3. Paste và chạy
4. Copy nội dung file `supabase/seed-data.sql`
5. Paste và chạy

### 5.3 Tạo Admin User

```sql
-- Chạy trong SQL Editor
INSERT INTO users (email, role) VALUES ('your-admin@email.com', 'senior_admin');
```

### 5.4 Cấu Hình Authentication

1. Vào **Authentication** → **Settings**
2. Cấu hình:
   - **Site URL**: `https://your-project.vercel.app`
   - **Redirect URLs**: `https://your-project.vercel.app/auth/callback`

---

## 🔧 Bước 6: Troubleshooting

### Lỗi Build Vercel

**Lỗi**: `Build failed`
```
# Kiểm tra Vercel build logs
# Đảm bảo package.json có đúng scripts
"scripts": {
  "build": "next build && node scripts/ensure-build-id.mjs"
}
```

**Lỗi**: `Module not found`
```
# Đảm bảo tất cả dependencies trong package.json
npm install
npm run build  # Test local trước
```

### Lỗi Environment Variables

**Lỗi**: `SUPABASE_URL not found`
```
# Kiểm tra biến environment trong Vercel
# Đảm bảo tên biến đúng chính tả
# Redeploy sau khi thêm biến
```

### Lỗi Database Connection

**Lỗi**: `Can't connect to Supabase`
```
# Kiểm tra URL và keys trong Vercel
# Đảm bảo Supabase project đang active
# Kiểm tra RLS policies
```

### Lỗi Authentication

**Lỗi**: `Invalid login credentials`
```
# Đảm bảo user tồn tại trong Supabase Auth
# Kiểm tra email confirmed
# Đảm bảo role đúng trong database
```

---

## 📊 Bước 7: Monitoring & Maintenance

### 7.1 Vercel Analytics

1. Vào Vercel Dashboard → **Analytics**
2. Enable Real Experience Score
3. Monitor performance và errors

### 7.2 Supabase Monitoring

1. Vào Supabase Dashboard → **Reports**
2. Monitor database usage
3. Check API logs

### 7.3 Backup Strategy

```bash
# Backup database schema
pg_dump --schema-only > schema_backup.sql

# Backup data
pg_dump --data-only > data_backup.sql
```

---

## 🎯 Checklist Trước Deploy

- [ ] Code build thành công local (`npm run build`)
- [ ] Tất cả environment variables có trong `.env.example`
- [ ] File `.gitignore` loại trừ đúng files
- [ ] Supabase database đã setup với schema và seed data
- [ ] Admin user đã tạo trong database
- [ ] GitHub repository đã tạo và push code
- [ ] Vercel project đã import từ GitHub
- [ ] Environment variables đã thêm vào Vercel
- [ ] Domain đã cấu hình (nếu có custom domain)

---

## 📞 Support

Nếu gặp vấn đề:

1. **Check logs**: Vercel Dashboard → Functions/Deployments
2. **Check Supabase**: Dashboard → Logs
3. **Test local**: `npm run dev` và test từng tính năng
4. **Documentation**: Xem các file README trong project

---

## 🔄 Update Code

Sau khi có thay đổi:

```bash
# Commit và push changes
git add .
git commit -m "Update: [mô tả thay đổi]"
git push origin main

# Vercel sẽ tự động redeploy
# Hoặc manual trigger trong Vercel Dashboard
```

---

*Hướng dẫn này được tạo cho project VFuture v5.0.0. Cập nhật theo thời gian để phù hợp với phiên bản mới nhất.*</content>
<parameter name="filePath">d:\VS Code Project\WEBSITE_FF_NEW\WEBSITE_FF_NEW_V5_TEST - Sao chép\GITHUB_VERCEL_DEPLOYMENT_GUIDE.md