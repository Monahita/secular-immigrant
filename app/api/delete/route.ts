import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(req: Request) {
  try {
    const { public_id, resource_type } = await req.json();

    if (!public_id) {
      return NextResponse.json(
        { error: "Missing public_id" },
        { status: 400 }
      );
    }

    const cloudinaryResourceType =
      resource_type === "video"
        ? "video"
        : resource_type === "raw"
        ? "raw"
        : "image";

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: cloudinaryResourceType,
    });

    console.log("DELETE RESULT:", result);

    return NextResponse.json(result);
  } catch (err) {
    console.error("DELETE ERROR:", err);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}