# 🚀 Complete Guide: GitHub Push & Vercel Deployment

**VFuture V5.0.0** - Next.js 14 CMS Platform  
**Status:** ✅ Production Ready  
**Build:** 201 kB | 46 Pages | 0 Errors

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Part 1: GitHub Setup](#part-1-github-setup)
3. [Part 2: Vercel Deployment](#part-2-vercel-deployment)
4. [Part 3: Post-Deployment Testing](#part-3-post-deployment-testing)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- ✅ GitHub account (free or paid)
- ✅ Vercel account (free - signup via GitHub)
- ✅ Supabase project with database configured

### Required Information
Before starting, gather:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxx...
```

---

## Part 1: GitHub Setup

### Step 1️⃣: Create Private Repository

**On GitHub:**

1. Go to https://github.com/new
2. Enter repository name: `vfuture` (or your preferred name)
3. Select **Private** (keep code confidential)
4. Initialize with `.gitignore` (Node.js)
5. Click **Create repository**

**Copy the repository URL:**
```
https://github.com/YOUR_USERNAME/vfuture.git
```

### Step 2️⃣: Configure Git Locally

**In PowerShell/Terminal:**

```powershell
cd "d:/VS Code Project/WEBSITE_FF_NEW/WEBSITE_FF_NEW_V5_TEST - Sao chép"

# Initialize git repository
git init

# Add your GitHub email and name
git config user.email "your@email.com"
git config user.name "Your Name"

# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/vfuture.git

# Verify remote configured
git remote -v
# Output should show:
# origin  https://github.com/YOUR_USERNAME/vfuture.git (fetch)
# origin  https://github.com/YOUR_USERNAME/vfuture.git (push)
```

### Step 3️⃣: Check .gitignore

**File to check:** `.gitignore` (should already exist)

**Important - These MUST be ignored (never committed):**
```
# Environment variables (REQUIRED)
.env.local
.env*.local

# Build outputs
.next/
node_modules/
dist/

# Logs
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

**Verify .env.local is NOT committed:**
```powershell
git status

# Should NOT show:
# .env.local
```

### Step 4️⃣: Add and Commit Files

**Stage all changes:**
```powershell
git add .

# Review what will be committed
git status

# Commit with message
git commit -m "🚀 Initial commit: VFuture V5.0.0 - Production Ready CMS"
```

**Output should show:**
```
463 files changed, 123456 insertions(+)
create mode 100644 src/...
create mode 100644 package.json
...
```

### Step 5️⃣: Push to GitHub

**First time push (create main branch):**
```powershell
git branch -M main
git push -u origin main

# -u flag: sets main as default upstream branch
```

**Subsequent pushes (faster):**
```powershell
git push
```

### Step 6️⃣: Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/vfuture
2. Verify files are visible:
   - ✅ `src/` folder with all components
   - ✅ `public/` folder with assets
   - ✅ `supabase/schema.sql`
   - ✅ `package.json`
   - ✅ `.env.example` (but NO `.env.local`)

---

## Part 2: Vercel Deployment

### Step 1️⃣: Sign Up on Vercel

1. Go to https://vercel.com/signup
2. Click **Continue with GitHub**
3. Authorize Vercel to access your GitHub account
4. Complete profile setup

### Step 2️⃣: Import GitHub Repository

**On Vercel Dashboard:**

1. Click **Add New...** → **Project**
2. Search for repository: `vfuture`
3. Click **Import**

### Step 3️⃣: Configure Project Settings

**Framework:** Next.js (should auto-detect)  
**Root Directory:** `./` (leave default)  

**Build Command Override:** (if needed)
```
npm run build
```

**Output Directory:** (leave as `.next`)

**Environment Variables:** Add these 3 variables

| Variable | Value | Source |
|----------|-------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Copy from Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...` | Copy from Supabase API Settings |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJxxx...` | Copy from Supabase API Settings |

**How to get Supabase credentials:**

1. Go to https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon (public) key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 4️⃣: Deploy

1. Click **Deploy**
2. Wait for build to complete (usually 2-3 minutes)
3. See success message: "✅ Production Ready"

**Deployment URL:** https://vfuture.vercel.app (automatically assigned)

### Step 5️⃣: Configure Custom Domain (Optional)

**If you own a domain:**

1. Go to **Project Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain: e.g., `vfuture.com`
4. Update DNS records as per Vercel instructions

---

## Part 3: Post-Deployment Testing

### 1. Public Pages

| Route | Expected | Status |
|-------|----------|--------|
| `/` | Home with hero | 🧪 Test |
| `/events` | Events listing | 🧪 Test |
| `/news` | News articles | 🧪 Test |
| `/calendar` | Event calendar | 🧪 Test |
| `/contact` | Contact form | 🧪 Test |

**Test Command:**
```powershell
# Visit in browser
https://vfuture.vercel.app
https://vfuture.vercel.app/events
https://vfuture.vercel.app/news
```

### 2. Admin Dashboard

| Area | What to Check | Status |
|------|---------------|--------|
| **Login** | Admin credentials work | 🧪 Test |
| **Dashboard** | Stats load correctly | 🧪 Test |
| **Events** | Can create/edit/delete | 🧪 Test |
| **News** | Can create/edit articles | 🧪 Test |
| **Gallery** | Can upload images | 🧪 Test |
| **Users** | Can manage users | 🧪 Test |
| **Settings** | Can save settings | 🧪 Test |

**Login URL:**
```
https://vfuture.vercel.app/auth/login
```

**Admin Panel:**
```
https://vfuture.vercel.app/admin
```

### 3. Verify Favicon

Check browser tab:
- ✅ Branded icon shows (VFuture logo)
- ✅ Both main pages and admin show same icon

### 4. Check Console for Errors

**In browser (F12 → Console):**
- ✅ No red error messages
- ✅ No 404 errors for CSS/JS
- ✅ No CORS errors

---

## 📁 Files Pushed to GitHub

### Essential Files to Commit

```
vfuture/
├── src/                           # ✅ Source code
│   ├── app/                      # ✅ Next.js routes & layouts
│   ├── components/               # ✅ React components
│   ├── hooks/                    # ✅ Custom React hooks
│   ├── lib/                      # ✅ Utilities, constants, types
│   └── store/                    # ✅ State management
├── public/                        # ✅ Static assets
│   ├── branding/                # ✅ Logo, icons, images
│   └── og-image.png             # ✅ Social preview image
├── supabase/                      # ✅ Database setup
│   └── schema.sql               # ✅ Database structure
├── scripts/                       # ✅ Build scripts
├── package.json                   # ✅ Dependencies
├── package-lock.json              # ✅ Lock file
├── tsconfig.json                  # ✅ TypeScript config
├── next.config.mjs                # ✅ Next.js config
├── tailwind.config.ts             # ✅ Tailwind config
├── postcss.config.mjs             # ✅ PostCSS config
├── .gitignore                     # ✅ Git ignore rules
├── .env.example                   # ✅ Env template (NO secrets)
├── README.md                      # ✅ Project documentation
├── DEPLOYMENT_SETUP.md            # ✅ Setup instructions
└── (other .md files)              # ✅ Documentation

```

### Files NOT Committed

```
❌ .env.local              (Contains secrets!)
❌ .next/                  (Build output)
❌ node_modules/           (Dependencies - npm installs)
❌ .vercel/                (Vercel cache)
❌ dist/                   (Old build output)
```

---

## Troubleshooting

### Build Failed on Vercel

**Error:** "Cannot find module..."

**Solution:**
```
1. On Vercel, go to Settings → Git
2. Click "Redeploy" button
3. Select "Yes, redeploy"
4. Wait for rebuild
```

### Environment Variables Not Working

**Check:**
```
1. Vercel Dashboard → Settings → Environment Variables
2. Verify all 3 variables are set:
   ✅ NEXT_PUBLIC_SUPABASE_URL
   ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
   ✅ SUPABASE_SERVICE_ROLE_KEY
3. Redeploy after adding variables
```

### Pages Show Blank/404

**Check:**
```
1. Browser console (F12) for errors
2. Network tab for failed requests
3. Check Supabase is running
4. Verify database schema exists
```

### CSS Not Loading

**Check:**
```
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Check Network tab - CSS files should load (200 status)
3. Check for CORS errors in console
```

### Admin Login Not Working

**Check:**
```
1. Verify Supabase project is active
2. Check admin user exists in database
3. Verify SUPABASE_SERVICE_ROLE_KEY is correct
4. Check database RLS policies are configured
```

---

## Quick Reference Commands

### Local Development
```powershell
npm install         # Install dependencies
npm run dev         # Start dev server (localhost:3000)
npm run build       # Create production build
npm run typecheck   # Check TypeScript types
npm run lint        # Run ESLint
```

### Git Operations
```powershell
git status          # Check changed files
git add .           # Stage all changes
git commit -m "message"  # Commit with message
git push            # Push to GitHub
git log             # View commit history
git diff            # View file changes
```

### Check File Sizes
```powershell
ls -lah             # List all files with sizes
Get-ChildItem -Recurse -ErrorAction SilentlyContinue | Measure-Object -Sum length
```

---

## 📊 Final Checklist Before Going Live

- [ ] Git repository created and private
- [ ] All files pushed to GitHub (except `.env.local`)
- [ ] `.env.example` created with template
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] 3 environment variables set on Vercel
- [ ] Initial deployment successful
- [ ] Home page loads without errors
- [ ] Admin login works
- [ ] Public pages accessible
- [ ] Favicon displays correctly
- [ ] No console errors in browser
- [ ] Database RLS policies configured

---

## 🎉 Success Indicators

When deployed on Vercel, you should see:

```
✅ vfuture.vercel.app is live
✅ Home page loads instantly
✅ Navigation works (Events, News, etc.)
✅ Admin panel accessible
✅ Images load from ImageKit
✅ Database queries work (no auth errors)
✅ Forms submit successfully
✅ Favicon visible in browser tab
```

---

## Support

**Having issues?**

1. Check console for error messages (F12)
2. Review Vercel build logs
3. Verify `.env.local` is in `.gitignore`
4. Ensure Supabase project is active
5. Re-read relevant troubleshooting section above

**Still stuck?**
- Check Vercel documentation: https://vercel.com/docs
- Check Next.js documentation: https://nextjs.org/docs
- Check Supabase documentation: https://supabase.com/docs

---

**Last Updated:** March 24, 2026  
**Version:** VFuture 5.0.0  
**Status:** ✅ Production Ready for Deployment
