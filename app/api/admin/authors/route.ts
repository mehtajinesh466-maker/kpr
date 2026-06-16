import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

// GET /api/admin/authors
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const authors = await prisma.author.findMany({
      orderBy: { name: "asc" }
    });
    return NextResponse.json(authors);
  } catch (error) {
    console.error("GET /api/admin/authors error:", error);
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 });
  }
}

// POST /api/admin/authors
export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, bio, avatarUrl, twitter, linkedin, website } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await prisma.author.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const author = await prisma.author.create({
      data: {
        name,
        slug,
        email: email || null,
        bio: bio || null,
        avatarUrl: avatarUrl || null,
        twitter: twitter || null,
        linkedin: linkedin || null,
        website: website || null
      }
    });

    return NextResponse.json(author);
  } catch (error) {
    console.error("POST /api/admin/authors error:", error);
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 });
  }
}
