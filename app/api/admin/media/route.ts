import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

// POST /api/admin/media — upload image to Cloudinary (unsigned)
export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        { error: "Cloudinary configuration missing. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in .env" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the file to a base64 data URI for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type || "image/png"};base64,${base64}`;

    // Upload to Cloudinary using unsigned upload with the preset
    const result = await cloudinary.uploader.upload(dataUri, {
      upload_preset: uploadPreset,
      folder: "chesseasy-blog",
      resource_type: "image",
    });

    const cloudinaryUrl = result.secure_url;

    // Save record in the MediaAsset database
    const asset = await prisma.mediaAsset.create({
      data: {
        filename: file.name,
        url: cloudinaryUrl,
        altText: altText || null,
        mimeType: file.type || null,
        size: file.size || null,
      },
    });

    return NextResponse.json(asset);
  } catch (error) {
    console.error("POST /api/admin/media error:", error);
    return NextResponse.json(
      { error: "Failed to upload file to Cloudinary" },
      { status: 500 }
    );
  }
}
