# 📚 VFUTURE V5 - Complete Deployment & Setup Guide

**© 2026 Veltrix Media Group. All Rights Reserved.**

**Status**: Production Ready | **Last Updated**: 24/03/2026

---

## 📖 Table of Contents

1. [Quick Start (5 phút)](#quick-start)
2. [Phase 1: Database Setup](#phase-1-database-setup)
3. [Phase 2: Admin Account Creation](#phase-2-admin-account-creation)
4. [Phase 3: Local Testing](#phase-3-local-testing)
5. [Phase 4: GitHub Setup](#phase-4-github-setup)
6. [Phase 5: Vercel Deployment](#phase-5-vercel-deployment)
7. [Email Configuration](#email-configuration)
8. [Security Checklist](#security-checklist)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

**Tóm tắt 5 bước deploy trong 30 phút:**

```bash
# Phase 1: Setup Database (5 phút)
# → Supabase Dashboard → SQL Editor
# → Paste schema.sql → Run
# → Paste seed-data.sql → Run

# Phase 2: Create Admin (2 phút)
# → Supabase Auth → Add User
# → Email: blazehunter01062008@gmail.com
# → Password: [strong password]

# Phase 3: Test Locally (5 phút)
npm run dev
# → Visit: http://localhost:3000/auth/login
# → Login with admin credentials

# Phase 4: GitHub (5 phút)
git init
git add .
git commit -m "VFuture V5 Production"
git remote add origin [your-private-repo]
git push -u origin main

# Phase 5: Vercel Deploy (8 phút)
# → Vercel.com → New Project
# → Import GitHub repo
# → Set env vars
# → Deploy!
```

**Total Time**: ~30 minutes ⏱️

---

## 📋 Phase 1: Database Setup

### Step 1.1: Access Supabase SQL Editor

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Login to your Supabase account
3. Select your project
4. Click **SQL Editor** in the left sidebar

### Step 1.2: Execute Schema SQL

```bash
# Copy all content from: supabase/schema.sql
# Paste into SQL Editor
# Click "Run" button
```

**What this does:**
- ✅ Creates database tables (users, events, news, gallery, settings, admin_activity_logs)
- ✅ Sets up Row Level Security (RLS) policies
- ✅ Creates triggers for auto-role assignment
- ✅ Sets up helper functions

**Expected output**: No errors, tables created successfully

### Step 1.3: Execute Seed Data

```bash
# Copy all content from: supabase/seed-data.sql
# Paste into SQL Editor
# Click "Run" button
```

**What this does:**
- ✅ Inserts 4 sample events
- ✅ Inserts 4 sample news articles
- ✅ Inserts 8 sample gallery images

**Expected output**: Data inserted, ready for demo

---

## 👤 Phase 2: Admin Account Creation

### Step 2.1: Create Auth User

1. Go to Supabase Dashboard
2. Click **Authentication** in left sidebar
3. Click **Users** tab
4. Click **Create new user** button

**Fill in:**
- **Email**: `blazehunter01062008@gmail.com`
- **Password**: [Generate strong password]
- **Email confirmed**: Check this box
- Click **Save**

### Step 2.2: Verify Role Assignment

The database trigger automatically assigns `senior_admin` role. To verify:

1. Go to SQL Editor
2. Run query:
```sql
SELECT id, email, role FROM users WHERE email = 'blazehunter01062008@gmail.com';
```
3. Check result shows: `role = 'senior_admin'` ✅

### Troubleshooting Admin Creation

**Problem**: Role not assigned automatically

**Solution**: Run SQL manually:
```sql
UPDATE users 
SET role = 'senior_admin' 
WHERE email = 'blazehunter01062008@gmail.com';
```

---

## 🧪 Phase 3: Local Testing

### Step 3.1: Setup Environment Variables

```bash
# Copy .env.example to .env.local
cp .env.example .env.local
```

**Fill in values:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Get these from Supabase:**
1. Project Dashboard → Settings → API
2. Copy "URL" → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy "anon public" → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy "service_role secret" → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3.2: Install Dependencies

```bash
npm install
```

### Step 3.3: Run Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 14.2.5
- Environments: .env.local
  ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 3.4: Test Public Pages

Visit these URLs and verify they load:

- ✅ Home: http://localhost:3000
- ✅ Calendar: http://localhost:3000/calendar
- ✅ Events: http://localhost:3000/events
- ✅ News: http://localhost:3000/news
- ✅ Contact: http://localhost:3000/contact

### Step 3.5: Test Admin Login

1. Go to http://localhost:3000/auth/login
2. Enter:
   - Email: `blazehunter01062008@gmail.com`
   - Password: [from Phase 2]
3. Click Login
4. **Expected**: Redirects to http://localhost:3000/admin ✅

### Step 3.6: Test Admin Dashboard

Verify these pages load:

- ✅ Dashboard: http://localhost:3000/admin
- ✅ Events Manager: http://localhost:3000/admin/events
- ✅ News Manager: http://localhost:3000/admin/news
- ✅ Gallery Manager: http://localhost:3000/admin/gallery
- ✅ Users Manager: http://localhost:3000/admin/users
- ✅ Activity Logs: http://localhost:3000/admin/logs
- ✅ Settings: http://localhost:3000/admin/settings

### Step 3.7: Create Test Content

1. Go to `/admin/news`
2. Click "TẠO BÀI VIẾT"
3. Fill in:
   - **Title**: "Test Article"
   - **Cover**: Any image URL
   - **Category**: Select one
   - **Created at**: Today
   - **Content**: Type some text with formatting
4. Click "LƯU TIN TỨC"
5. **Expected**: Article appears in list ✅

**Verify Rich Text Features:**
- ✅ Bold/Italic/Underline buttons work
- ✅ Paste link auto-formats with color
- ✅ Paste image creates figure with caption
- ✅ Email addresses auto-link

---

## 🐙 Phase 4: GitHub Setup

### Step 4.1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `vfuture-v5` (or your choice)
3. **Description**: "VFuture V5 CMS Platform"
4. **Visibility**: Private ⚠️ IMPORTANT
5. Click **Create repository**

### Step 4.2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: VFuture V5 Production-Ready CMS"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/vfuture-v5.git

# Push to main branch
git branch -M main
git push -u origin main
```

**Verify on GitHub:**
- ✅ All files uploaded
- ✅ Repository is Private
- ✅ No `.env.local` file (should be in .gitignore)

### Step 4.3: Verify Git Protection

Make sure `.env.local` is in `.gitignore`:

```bash
# .gitignore should contain:
.env*.local
```

✅ Verify command:
```bash
git check-ignore .env.local
# Should output: .env.local (meaning it's ignored)
```

---

## 🚀 Phase 5: Vercel Deployment

### Step 5.1: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Login/Signup
3. Click **New Project**
4. Click **Import Git Repository**
5. Select your GitHub repo (`vfuture-v5`)
6. Click **Import**

### Step 5.2: Configure Environment Variables

In Vercel project settings, go to **Settings → Environment Variables**

Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL = [from Supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [from Supabase]
SUPABASE_SERVICE_ROLE_KEY = [from Supabase]
NEXT_PUBLIC_SITE_URL = https://your-project.vercel.app
```

**Important**: Leave Node version as default, use Node 18+

### Step 5.3: Deploy

1. Click **Deploy** button
2. Wait for build to complete (~2-3 minutes)
3. **Expected**: ✅ Deployment successful

### Step 5.4: Test Production

1. Go to your Vercel domain (e.g., `https://vfuture-v5.vercel.app`)
2. Test public pages load ✅
3. Test login at `/auth/login` ✅
4. Test admin dashboard at `/admin` ✅

### Step 5.5: Update Domain (Optional)

To use custom domain:

1. Vercel project → Settings → Domains
2. Click **Add Domain**
3. Enter your domain
4. Follow DNS setup instructions
5. Click **Verify**

---

## ✉️ Email Configuration

### Gmail SMTP Setup (For Password Reset Emails)

#### Step 1: Create App Password

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in left sidebar
3. Enable **2-Step Verification** (if not enabled)
4. Go back to Security
5. Scroll to **App passwords**
6. Select "Mail" and "Windows Computer"
7. Copy the generated password

#### Step 2: Update .env.local

```
RESEND_API_KEY=re_your_key_here
ADMIN_INVITE_FROM_EMAIL=VFuture Admin <noreply@your-email.com>
ADMIN_INVITE_REPLY_TO_EMAIL=support@your-email.com
```

#### Step 3: Verify Email Works

1. Go to `/auth/forgot-password`
2. Enter admin email
3. Check email inbox for reset link ✅

---

## 🔒 Security Checklist

Before deploying to production:

### Code Level
- [x] No demo auth routes
- [x] No experimental mode
- [x] No sensitive keys in source
- [x] TypeScript strict mode enabled
- [x] ESLint rules enforced

### Database Level
- [x] RLS enabled on all tables
- [x] Policies configured correctly
- [x] Service role key stored securely
- [x] No public access to sensitive tables

### Application Level
- [x] Input sanitization enabled
- [x] CSRF protection configured
- [x] CSP headers configured
- [x] HTTPS enforced
- [x] Admin routes protected

### Deployment Level
- [x] Private GitHub repository
- [x] Env vars in Vercel (not in code)
- [x] Production database configured
- [x] Backups enabled
- [x] Monitoring setup (optional)

---

## 🐛 Troubleshooting

### Admin Page Shows Blank/White Screen

**Problem**: Admin page loads but shows nothing

**Solutions:**
1. Check browser console for errors (F12)
2. Verify Supabase connection:
```bash
npm run dev
# Check terminal for connection errors
```
3. Check admin user exists in Supabase
4. Clear browser cache and reload

### "Cannot find module" during build

**Problem**: Build fails with module not found

**Solution**:
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Login redirects to login page again

**Problem**: Admin login doesn't work

**Solutions:**
1. Verify admin account exists: 
   - Supabase → Authentication → Users
   - Check `role = 'senior_admin'`
2. Verify .env.local has correct Supabase keys
3. Check email is exactly: `blazehunter01062008@gmail.com`
4. Reset password if needed

### Database queries slow

**Problem**: Pages load slowly

**Solutions:**
1. Add database indexes (Supabase auto-indexes primary keys)
2. Clear browser cache
3. Check internet connection
4. Verify Supabase project status

### Image upload fails

**Problem**: Cannot upload images in gallery

**Solutions:**
1. Check file size < 10MB
2. Check image format (jpg, png, webp)
3. Verify Supabase Storage bucket exists
4. Check storage permissions in RLS

### Email not sending

**Problem**: Password reset emails don't arrive

**Solutions:**
1. Verify RESEND_API_KEY is correct
2. Check spam/junk folder
3. Verify FROM email is valid
4. Check email logs in Supabase

---

## 📊 Verification Checklist

Run this before final deployment:

```bash
# Code quality checks
npm run typecheck  # Should show: 0 errors
npm run lint       # Should show: 0 warnings
npm run build      # Should build successfully

# Then verify:
# ✅ Build size: ~201 kB
# ✅ All 46 pages compiled
# ✅ No TypeScript errors
# ✅ No ESLint warnings
# ✅ .env.local not included
```

---

## 🎉 Deployment Complete!

Once you reach this point:

✅ **Development**: Code verified locally  
✅ **Database**: Schema setup with test data  
✅ **Authentication**: Admin account configured  
✅ **Testing**: All pages and features working  
✅ **GitHub**: Code pushed to private repo  
✅ **Production**: Live on Vercel  

**Congratulations! Your VFuture V5 system is live! 🚀**

---

## 📞 Support

For issues not covered here:

1. Check the main **README.md** for system overview
2. Check **SECURITY_AUDIT.md** for security details
3. Review Supabase docs: [https://supabase.com/docs](https://supabase.com/docs)
4. Check Next.js docs: [https://nextjs.org/docs](https://nextjs.org/docs)

**Email**: nguyenminhkhoi.booking@gmail.com  
**Facebook**: https://www.facebook.com/ngxkhoi.ae/

---

**© 2026 Veltrix Media Group. All Rights Reserved.**
