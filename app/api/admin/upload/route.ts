import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "portfolio";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Option A: Supabase Storage Upload (100% Reliable, Works on Vercel & Serverless)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ounhqugnzmhciqwanhgt.supabase.co";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const bucketName = "portfolio-images";

        // Ensure bucket exists
        const { data: buckets } = await supabase.storage.listBuckets();
        if (!buckets?.some(b => b.name === bucketName)) {
          await supabase.storage.createBucket(bucketName, { public: true });
        }

        const fileExt = path.extname(file.name) || ".png";
        const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;

        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from(bucketName)
          .upload(fileName, buffer, {
            contentType: file.type || "image/png",
            upsert: true
          });

        if (!uploadErr && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({ 
              url: publicUrlData.publicUrl, 
              provider: "supabase" 
            });
          }
        } else {
          console.error("Supabase storage error:", uploadErr);
        }
      } catch (spErr) {
        console.error("Supabase client error:", spErr);
      }
    }

    // Option B: Cloudinary Signed Upload
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || "drni46zvq";
    const apiKey = process.env.CLOUDINARY_API_KEY || "585472775914165";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "nHfZ52iswAjjr5jMVBZwmUzaF9M";

    if (cloudName && apiKey && apiSecret) {
      try {
        const timestamp = Math.floor(Date.now() / 1000);
        const strToSign = `timestamp=${timestamp}${apiSecret}`;
        const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

        const cloudFormData = new FormData();
        const blob = new Blob([buffer], { type: file.type || "image/png" });
        cloudFormData.append("file", blob, file.name || "upload.png");
        cloudFormData.append("api_key", apiKey);
        cloudFormData.append("timestamp", timestamp.toString());
        cloudFormData.append("signature", signature);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: cloudFormData,
        });

        const json = await res.json();
        if (json.secure_url || json.url) {
          return NextResponse.json({ 
            url: json.secure_url || json.url, 
            provider: "cloudinary" 
          });
        }
      } catch (cErr) {
        console.error("Cloudinary fetch error:", cErr);
      }
    }

    // Option C: Local Fallback
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileExt = path.extname(file.name) || ".png";
      const filename = `${folder}_${Date.now()}${fileExt}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, buffer);

      const localUrl = `/uploads/${filename}`;
      return NextResponse.json({ 
        url: localUrl, 
        provider: "local" 
      });
    } catch (fsErr: any) {
      return NextResponse.json({ 
        error: "Upload failed: Please check storage configuration." 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image" }, { status: 500 });
  }
}
