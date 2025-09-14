import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import UploadImage from "@/lib/upload-image";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Cloudinary
    const result = await UploadImage(file, process.env.CLOUDINARY_UPLOAD_IMAGES!);
    
    return NextResponse.json({
      imageURL: result.secure_url,
      publicId: result.public_id
    }, { status: 200 });

  } catch (error) {
    console.error("Failed to upload profile image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
