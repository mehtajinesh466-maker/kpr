import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

// GET /api/admin/categories
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const categories = await prisma.category.findMany({
      include: {
        parent: { select: { id: true, name: true } }
      },
      orderBy: { name: "asc" }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/admin/categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST /api/admin/categories
export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, parentId } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await prisma.category.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        parentId: parentId || null
      },
      include: {
        parent: { select: { id: true, name: true } }
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("POST /api/admin/categories error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
