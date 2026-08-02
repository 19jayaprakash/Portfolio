import { NextRequest, NextResponse } from "next/server";
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

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Option A: Cloudinary Signed Upload
    if (cloudName && apiKey && apiSecret) {
      const timestamp = Math.floor(Date.now() / 1000);
      const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

      const cloudFormData = new FormData();
      const blob = new Blob([buffer], { type: file.type });
      cloudFormData.append("file", blob, file.name);
      cloudFormData.append("api_key", apiKey);
      cloudFormData.append("timestamp", timestamp.toString());
      cloudFormData.append("signature", signature);
      cloudFormData.append("folder", folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: cloudFormData,
      });

      const json = await res.json();
      if (json.secure_url) {
        return NextResponse.json({ url: json.secure_url, provider: "cloudinary" });
      } else {
        console.error("Cloudinary upload error:", json);
      }
    }

    // Option B: Cloudinary Unsigned Upload
    if (cloudName && uploadPreset) {
      const cloudFormData = new FormData();
      const blob = new Blob([buffer], { type: file.type });
      cloudFormData.append("file", blob, file.name);
      cloudFormData.append("upload_preset", uploadPreset);
      if (folder) cloudFormData.append("folder", folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: cloudFormData,
      });

      const json = await res.json();
      if (json.secure_url) {
        return NextResponse.json({ url: json.secure_url, provider: "cloudinary" });
      }
    }

    // Option C: Fallback to local /public/uploads/
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
      provider: "local",
      message: "Uploaded locally. Add Cloudinary keys to .env.local to upload to Cloudinary directly." 
    });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image" }, { status: 500 });
  }
}
