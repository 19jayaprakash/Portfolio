# Email Setup Instructions with EmailJS

## Step 1: Sign up for EmailJS
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Select "Gmail" (or your preferred email provider)
4. Connect your Gmail account (jayaprakash.r024@gmail.com)
5. Click "Create Service"
6. Copy the **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template
1. Click "Email Templates" in the dashboard
2. Click "Create New Template"
3. Set up your template:
   - **To Email**: `{{to_email}}`
   - **Subject**: `New Contact Form Message from {{from_name}}`
   - **Content**:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Service: {{service}}
     
     Message:
     {{message}}
     ```
4. Save the template
5. Copy the **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Your Public Key
1. Go to "Account" (click your profile icon)
2. Find your **Public Key** in the API Keys section
3. Copy it (e.g., `XXXXXXXXXXXXXXXXX`)

## Step 5: Update .env.local
Open the `.env.local` file and replace the placeholder values:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-actual-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-actual-template-id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-actual-public-key
```

## Step 6: Restart Your Development Server
```bash
npm run dev
```

## How It Works
- When someone fills out the contact form
- The form data is sent directly to EmailJS
- EmailJS sends an email to jayaprakash.r024@gmail.com
- All form fields are included in the email

## Note About File Uploads
EmailJS free tier has limitations with file attachments. The current implementation:
- ✅ Sends all form data (name, email, message, service)
- ⚠️ File upload UI is present but requires EmailJS paid plan for attachments

### Alternative for File Uploads (Free):
If you need file uploads on the free plan, consider:
1. Using a cloud storage service (Google Drive, Dropbox)
2. Adding the file link in the message field
3. Or upgrading to EmailJS paid plan for attachments

## Supported Form Fields
- Name
- Email
- Service selection
- Message
- File attachment (paid plan only)
