# 🚀 Supabase Setup Guide - Complete Instructions

## Step-by-Step Setup (10 minutes)

---

## 1️⃣ Install Supabase Package

Run this command in your terminal:

```bash
npm install @supabase/supabase-js
```

---

## 2️⃣ Create Supabase Account

1. Go to https://supabase.com
2. Click **"Start your project"** or **"Sign In"**
3. Sign up with GitHub, Google, or Email
4. Verify your email address

---

## 3️⃣ Create a New Project

1. Click **"New Project"** in your dashboard
2. Fill in:
   - **Name**: `portfolio` (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you (e.g., `Southeast Asia` for India)
3. Click **"Create new project"**
4. Wait 1-2 minutes for setup to complete

---

## 4️⃣ Get Your API Keys

1. In your Supabase project dashboard
2. Go to **Settings** (gear icon in sidebar)
3. Click **API** in the settings menu
4. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **API Keys**:
     - `anon` `public` key (for browser)
     - `service_role` `secret` key (for server - keep this secret!)

---

## 5️⃣ Run the SQL Setup Script

1. In Supabase dashboard, click **SQL Editor** in sidebar
2. Click **New Query**
3. Open the file `supabase-setup.sql` from your project
4. Copy ALL the SQL code
5. Paste it into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see: `total_records: 1`

✅ Database is now set up with your portfolio data!

---

## 6️⃣ Update Environment Variables

Open `.env.local` in your project and replace:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

With your actual values from Supabase:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcd1234.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:**
- Use the exact keys from Supabase
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
- `SUPABASE_SERVICE_ROLE_KEY` = service_role secret key

---

## 7️⃣ Test Locally

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Test portfolio display:
   - Go to `http://localhost:3000`
   - Should load normally

3. Test admin panel:
   - Go to `http://localhost:3000/admin`
   - Login with: `admin123`
   - Edit something (e.g., change your name)
   - Click **"Save Changes"**
   - Refresh page - changes should persist! ✅

4. Verify in Supabase:
   - Go to Supabase dashboard
   - Click **Table Editor**
   - Click `portfolio_data` table
   - You should see your updated data!

---

## 8️⃣ Verify Everything Works

### Test Admin Save:
1. Login to admin panel
2. Go to "Personal" tab
3. Change your name to "Test Name"
4. Click "Save Changes"
5. Wait for "Saved!" confirmation
6. Refresh the page
7. ✅ Name should still be "Test Name"

### Test Data Persistence:
1. Make any change in admin
2. Save it
3. Stop dev server (`Ctrl+C`)
4. Restart: `npm run dev`
5. ✅ Changes should still be there

### Test Supabase Dashboard:
1. Go to Supabase → Table Editor
2. Open `portfolio_data` table
3. Click on the `data` column
4. ✅ You should see your JSON data

---

## 9️⃣ Prepare for Vercel Deployment

### Add Environment Variables to Vercel:

When deploying to Vercel, add these in your project settings:

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_bbklj68
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_l8mye6h
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=4vG4hIhXAxpWDZkmG
   ADMIN_PASSWORD=your-secure-password
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## 🎯 What's Been Configured

### ✅ Files Created:
- `/lib/supabase.ts` - Supabase client configuration
- `/supabase-setup.sql` - Database setup script
- Updated `.env.local` - Added Supabase variables
- Updated `.env.example` - Template with Supabase

### ✅ API Routes Updated:
- `/app/api/portfolio/route.ts` - Fetches from Supabase
- `/app/api/admin/update/route.ts` - Saves to Supabase

### ✅ Database Structure:
- Table: `portfolio_data`
- Columns: `id`, `data` (JSONB), `created_at`, `updated_at`
- RLS policies for security
- Auto-update timestamp trigger

---

## 🔒 Security Features

### Row Level Security (RLS):
- ✅ Public can READ portfolio data
- ✅ Only service role can WRITE (your API routes)
- ✅ Service role key is server-side only (never exposed to browser)

### Environment Variables:
- ✅ Anon key is public (safe for browser)
- ✅ Service role key is secret (server only)
- ✅ Both stored in `.env.local` (not committed to git)

---

## 🐛 Troubleshooting

### "Failed to fetch portfolio data"
**Fix:**
1. Check Supabase URL in `.env.local`
2. Verify SQL script was run successfully
3. Check browser console for errors

### "Failed to save data"
**Fix:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
2. Check Supabase dashboard → Logs
3. Ensure RLS policies are set up

### Can't connect to Supabase
**Fix:**
1. Check internet connection
2. Verify project is active in Supabase
3. Check firewall settings

### Data not persisting
**Fix:**
1. Make sure you clicked "Save Changes"
2. Check Supabase Table Editor for data
3. Verify API routes are using Supabase

---

## 📊 Database Schema

```sql
portfolio_data
├── id (UUID, auto-generated)
├── data (JSONB, all portfolio content)
├── created_at (timestamp)
└── updated_at (timestamp, auto-updates)
```

The `data` column contains all your portfolio content as JSON:
```json
{
  "personal": { ... },
  "stats": { ... },
  "projects": { ... },
  "studies": { ... },
  "testimonials": { ... },
  "freelance": { ... },
  "contact": { ... }
}
```

---

## 🎉 Success Checklist

- [ ] Installed `@supabase/supabase-js`
- [ ] Created Supabase account
- [ ] Created new project
- [ ] Copied API keys
- [ ] Ran SQL setup script
- [ ] Updated `.env.local` with Supabase credentials
- [ ] Tested admin save locally
- [ ] Verified data in Supabase dashboard
- [ ] Changes persist after refresh

---

## 🚀 Next: Deploy to Vercel

Once Supabase is working locally:

1. Push code to GitHub
2. Connect to Vercel
3. Add all environment variables
4. Deploy!

Your portfolio will now have:
- ✅ Persistent data storage
- ✅ Real-time admin updates
- ✅ Production-ready database
- ✅ Secure API routes

---

## 💡 Pro Tips

1. **Backup your data**: Export from Supabase Table Editor regularly
2. **Monitor usage**: Check Supabase dashboard for API usage
3. **Free tier limits**: 500MB database, 2GB bandwidth/month (plenty for portfolio)
4. **Test locally first**: Always verify changes work locally before deploying

---

## 📞 Quick Reference

**Supabase Dashboard**: https://app.supabase.com
**Project Settings**: Settings → API
**SQL Editor**: SQL Editor → New Query
**Table Editor**: Table Editor → portfolio_data
**API Logs**: Logs → API

**Need help?** Check the Supabase docs: https://supabase.com/docs

---

## ✅ You're All Set!

Your portfolio now has a production-ready database. Start editing content in the admin panel, and it will persist forever! 🎉
