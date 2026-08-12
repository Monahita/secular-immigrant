import { v2 as cloudinary } from "cloudinary";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { r2, R2_BUCKET_NAME } from "@/lib/r2";

cloudinary.config({
cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
api_key: process.env.CLOUDINARY_API_KEY!,
api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
try {
const formData = await req.formData();
const file = formData.get("file") as File;

if (!file) {
  return NextResponse.json(
    { error: "No file uploaded" },
    { status: 400 }
  );
}

const folder =
  (formData.get("folder") as string) || "articles";

const bytes = await file.arrayBuffer();
const buffer = Buffer.from(bytes);

const originalName = file.name.replace(/\.[^/.]+$/, "");

const resourceType =
  file.type === "application/pdf" ? "raw" : "auto";

// -----------------------------
// 1. Upload to Cloudinary
// -----------------------------

const cloudinaryResult = await new Promise<any>(
  (resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `secular-immigrant/${folder}`,
        public_id: originalName,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(buffer);
  }
);

// -----------------------------
// 2. Backup to Cloudflare R2
// -----------------------------

let backupStatus = "ok";
let backupKey = "";

try {
  const safeName = file.name.replace(
    /[^a-zA-Z0-9._-]/g,
    "_"
  );

  backupKey =
    `secular-immigrant/${folder}/` +
    `${Date.now()}-${safeName}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: backupKey,
      Body: buffer,
      ContentType:
        file.type || "application/octet-stream",
    })
  );
} catch (backupError) {
  backupStatus = "failed";

  console.error(
    "R2 backup failed:",
    backupError
  );
}

// -----------------------------
// 3. Return successful upload
// -----------------------------

return NextResponse.json({
  secure_url: cloudinaryResult.secure_url,
  backup: {
    status: backupStatus,
    key: backupKey,
  },
});


} catch (err) {
console.error("Upload failed:", err);

return NextResponse.json(
  { error: "Upload failed" },
  { status: 500 }
);

}
}
