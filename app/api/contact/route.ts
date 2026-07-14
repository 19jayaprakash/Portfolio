import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const service = formData.get('service') as string;
    const file = formData.get('file') as File | null;

    // Fetch recipient email dynamically from Supabase
    let recipientEmail = 'contact.aeropeak@gmail.com';
    try {
      const { data: portfolioData, error: dbError } = await supabaseAdmin
        .from('portfolio_data')
        .select('data')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!dbError && portfolioData?.data?.contact?.email) {
        recipientEmail = portfolioData.data.contact.email;
      }
    } catch (dbErr) {
      console.error('Failed to fetch contact email from Supabase, using default fallback:', dbErr);
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Prepare email content
    let htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Prepare attachments
    const attachments: any[] = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `New Contact Form Message from ${name}`,
      html: htmlContent,
      attachments: attachments,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
