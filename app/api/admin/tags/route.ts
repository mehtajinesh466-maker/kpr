import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

// GET /api/admin/tags
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" }
    });
    return NextResponse.json(tags);
  } catch (error) {
    console.error("GET /api/admin/tags error:", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}

// POST /api/admin/tags
export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await prisma.tag.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const tag = await prisma.tag.create({
      data: { name, slug }
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.error("POST /api/admin/tags error:", error);
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}
