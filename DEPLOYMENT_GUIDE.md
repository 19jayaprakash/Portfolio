# Vercel Deployment Guide with Database

## Current Setup
Your portfolio now includes:
- ✅ Contact form with EmailJS integration
- ✅ Admin panel for editing content
- ✅ Auto-reset form after 3 seconds
- ✅ Updated social links
- ✅ JP favicon icon
- ✅ Metadata configuration

## Important: Database Integration Needed for Production

The current admin panel saves data to a local JSON file, which **won't work on Vercel** because:
- Vercel deployments are serverless and stateless
- File system writes don't persist between deployments
- Each deployment starts fresh

## Solution: Use a Database Service

### Option 1: Supabase (Recommended - Free & Easy)

#### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Sign up for a free account
3. Create a new project

#### Step 2: Create Database Table
1. Go to SQL Editor in Supabase
2. Run this SQL:
```sql
CREATE TABLE portfolio_data (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default data
INSERT INTO portfolio_data (data) VALUES ('{}'::jsonb);
```

#### Step 3: Install Supabase Client
```bash
npm install @supabase/supabase-js
```

#### Step 4: Add Environment Variables to `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Step 5: Update API Routes
I can help you update the API routes to use Supabase instead of local files.

---

### Option 2: Vercel KV Storage (Simple)

#### Step 1: Add Vercel KV Integration
1. Go to your Vercel project dashboard
2. Navigate to Storage tab
3. Click "Create Database" → Select "KV"
4. Follow the setup wizard

#### Step 2: Install Vercel KV
```bash
npm install @vercel/kv
```

#### Step 3: Update API Routes
Use `@vercel/kv` to store and retrieve portfolio data.

---

### Option 3: MongoDB Atlas (Free Tier)

#### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string

#### Step 2: Install MongoDB
```bash
npm install mongodb
```

#### Step 3: Add Environment Variable
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

---

## Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit with admin panel"
git branch -M main
git remote add origin https://github.com/19jayaprakash/portfolio.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `ADMIN_PASSWORD`
   - Database credentials (Supabase/MongoDB/etc.)

### Step 3: Deploy
Click "Deploy" and Vercel will build and deploy your site.

---

## Current Working Features (Without Database)

✅ Contact form sends emails via EmailJS
✅ Admin login page at `/admin/login`
✅ Admin dashboard UI
✅ Form auto-resets after 3 seconds
✅ Social links updated
✅ JP favicon

## What Needs Database Integration

⚠️ Admin panel save functionality
⚠️ Persistent data editing
⚠️ Projects/studies/testimonials editing

---

## Quick Test (Local Development)

1. Start the dev server:
```bash
npm run dev
```

2. Visit the portfolio: `http://localhost:3000`

3. Test contact form (will send email via EmailJS)

4. Access admin panel: `http://localhost:3000/admin`
   - Default password: `admin123`
   - You can edit personal info and stats
   - Save button works locally (saves to JSON file)

---

## Next Steps

1. **Choose a database service** (Supabase recommended)
2. **Let me know which one you prefer**
3. **I'll update the API routes** to use that database
4. **Deploy to Vercel** with proper environment variables

Would you like me to:
- A) Set up Supabase integration
- B) Set up Vercel KV integration
- C) Set up MongoDB integration
- D) Complete the full editor for all sections (projects, studies, etc.)
