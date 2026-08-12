import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder=secular-immigrant/*")
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    return NextResponse.json(result.resources);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Cannot load media" },
      { status: 500 }
    );
  }
}