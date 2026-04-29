# Admin Panel User Guide

## 🎯 Overview

Your portfolio now has a **complete admin panel** with full editing capabilities for all sections. You can add, edit, and delete content directly from the admin dashboard.

---

## 🔐 Accessing the Admin Panel

### Login
- **URL**: `http://localhost:3000/admin` (local) or `https://yourdomain.com/admin` (production)
- **Default Password**: `admin123`
- **Change Password**: Update `ADMIN_PASSWORD` in `.env.local`

### Security
- Session-based authentication (expires when browser closes)
- Protected API routes
- **Important**: Change the default password before deploying!

---

## 📋 Admin Dashboard Features

### 1. **Personal Tab** ✏️
Edit your basic information:
- Name
- Title/Role
- Email address
- Location
- Availability hours
- GitHub URL
- LinkedIn URL
- Hero section title
- Hero section subtitle

### 2. **Stats Tab** 📊
Update your statistics:
- Years of Experience
- Projects Completed
- Technologies Count
- Happy Clients

### 3. **Projects Tab** 💼
**Full CRUD operations** (Create, Read, Update, Delete)

**To Add a Project:**
1. Click "Add Project" button
2. Click the edit (pencil) icon on the new project
3. Fill in:
   - Title
   - Description
   - GitHub URL
   - Live URL
   - Duration
   - Tags (comma-separated)
4. Click the checkmark to finish editing

**To Edit a Project:**
1. Click the edit (pencil) icon
2. Modify the fields
3. Click the checkmark when done

**To Delete a Project:**
1. Click the red trash icon
2. Project is immediately removed

### 4. **Education Tab** 🎓
**Full CRUD operations**

**Fields:**
- Degree name
- Institution
- Duration (e.g., "2020 - 2024")
- Description

**Same workflow as Projects** (Add → Edit → Save)

### 5. **Testimonials Tab** ⭐
**Full CRUD operations**

**Fields:**
- Client name
- Role/Position
- Company
- Testimonial content (what they said)

### 6. **Freelance Tab** 🚀
**Full CRUD operations**

**Fields:**
- Project title
- Client name
- Duration
- Description
- Tags (comma-separated)

### 7. **Services Tab** 🛠️
**Full CRUD operations**

**Fields:**
- Service title
- Service description

### 8. **Contact Tab** 📧
Edit contact section content:
- Title line 1 (e.g., "Let's build")
- Title line 2 (e.g., "something great")
- Description text
- Available services (comma-separated)

---

## 💾 Saving Changes

### Important: Save Button
- After making any changes, click **"Save Changes"** in the top right
- You'll see "Saving..." → "Saved!" confirmation
- **Green checkmark** means success
- Changes persist after saving

### Auto-Save
- ⚠️ **No auto-save** - you must manually click "Save Changes"
- Unsaved changes will be lost if you navigate away

---

## 🎨 UI Features

### Visual Indicators
- **Blue border**: Currently editing item
- **Pencil icon**: Click to edit
- **Checkmark icon**: Click to finish editing
- **Trash icon**: Delete item (red button)
- **Item count**: Shows total items per section

### Responsive Design
- Works on desktop, tablet, and mobile
- Scrollable tabs on smaller screens
- Touch-friendly buttons

---

## 📸 Image Handling

### Current Setup
Images use paths from the `/public/images` folder:
- `/images/photo1.jpg`
- `/images/photo2.jpg`
- etc.

### To Change Images:
1. Add new images to `/public/images/` folder
2. Update the image path in the editor
3. Save changes

### Future Enhancement
Image upload functionality can be added later to:
- Upload directly from admin panel
- Auto-optimize images
- Store in cloud (Cloudinary, AWS S3, etc.)

---

## 🔄 Workflow Example: Adding a New Project

1. **Login** to admin panel
2. Click **"Projects"** tab
3. Click **"Add Project"** button
4. New project appears with default values
5. Click **pencil icon** on the new project
6. Fill in all fields:
   ```
   Title: E-Commerce Platform
   Description: A full-featured online store...
   GitHub URL: https://github.com/yourname/project
   Live URL: https://project.com
   Duration: 3 months
   Tags: Next.js, Node.js, MongoDB, Stripe
   ```
7. Click **checkmark** to exit edit mode
8. Click **"Save Changes"** at top right
9. Wait for "Saved!" confirmation
10. ✅ Done! Project is saved

---

## 🚀 Deployment Checklist

Before deploying to Vercel:

### 1. Change Password
```env
ADMIN_PASSWORD=your-secure-password-here
```

### 2. Add Database (Required for Production)
Choose one:
- **Supabase** (recommended) - See DEPLOYMENT_GUIDE.md
- **Vercel KV Storage**
- **MongoDB Atlas**

### 3. Test Locally
```bash
npm run dev
```
- Test all tabs
- Add/edit/delete items
- Save and verify persistence

### 4. Environment Variables for Vercel
Add these in Vercel dashboard:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `ADMIN_PASSWORD`
- Database credentials (if using)

---

## 🐛 Troubleshooting

### Changes Not Saving?
- Check if you clicked "Save Changes"
- Check browser console for errors
- Verify API route is working

### Can't Login?
- Verify password in `.env.local`
- Clear browser cache/session
- Restart dev server

### Items Not Showing on Website?
- Components need to be updated to use dynamic data
- Currently using hardcoded data in components
- **Next step**: Integrate database and fetch data

---

## 📊 Current Status

### ✅ Working:
- Full admin panel UI
- Add/Edit/Delete all sections
- Local save functionality
- Email contact form
- Authentication

### ⚠️ Needs Database for Production:
- Persistent data storage
- Live updates to website
- Image uploads

### 🔜 Future Enhancements:
- Rich text editor for descriptions
- Image upload with optimization
- Drag-and-drop reordering
- Preview mode
- Version history
- Multi-language support

---

## 🎓 Tips & Best Practices

### 1. **Save Frequently**
Don't wait until you've made many changes. Save after each section.

### 2. **Test Before Deploying**
Always test changes locally first.

### 3. **Backup Data**
Before major changes, backup your portfolio data file.

### 4. **Use Descriptive Tags**
For projects and freelance, use relevant technology tags.

### 5. **Keep Descriptions Concise**
2-3 sentences max for better readability.

### 6. **Regular Updates**
Keep your portfolio current with recent projects.

---

## 📞 Need Help?

### Common Tasks:
- **Add project**: Projects tab → Add Project → Edit → Save
- **Update stats**: Stats tab → Change numbers → Save
- **Edit bio**: Personal tab → Update fields → Save
- **Add testimonial**: Testimonials tab → Add → Fill details → Save

### Files to Know:
- Admin panel: `/app/admin/dashboard/page.tsx`
- Data structure: `/lib/portfolio-data.ts`
- API routes: `/app/api/admin/`

---

## 🎉 You're All Set!

Your admin panel is complete and ready to use. Start by:

1. Running `npm run dev`
2. Going to `http://localhost:3000/admin`
3. Logging in with password: `admin123`
4. Editing your portfolio content
5. Clicking "Save Changes"

**Happy portfolio building!** 🚀
