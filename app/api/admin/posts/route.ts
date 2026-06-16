import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { uniqueSlug } from "@/lib/slug";
import { PostStatus } from "@/lib/generated/prisma/client";

// GET /api/admin/posts
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const statusParam = searchParams.get("status");
    const search = searchParams.get("search") || "";

    const whereClause: any = {};

    if (statusParam && statusParam !== "ALL") {
      whereClause.status = statusParam;
    }

    if (search.trim()) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } }
      ];
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        authors: { include: { author: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        _count: { select: { comments: true } }
      },
      orderBy: { updatedAt: "desc" }
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/admin/posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST /api/admin/posts
export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      contentHtml,
      metaTitle,
      metaDescription,
      focusKeyword,
      canonicalUrl,
      status,
      publishedAt,
      scheduledAt,
      featuredImageUrl,
      featuredImageAlt,
      listingThumbnailUrl,
      isFeatured,
      isPinned,
      showTableOfContents,
      readTimeMinutes,
      authorIds,
      categoryIds,
      tagIds
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Generate unique slug
    const slug = await uniqueSlug(title, async (s) => {
      const exists = await prisma.post.findUnique({ where: { slug: s } });
      return !!exists;
    });

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content: content || { type: "doc", content: [] },
        contentHtml: contentHtml || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        focusKeyword: focusKeyword || null,
        canonicalUrl: canonicalUrl || null,
        status: status || PostStatus.DRAFT,
        publishedAt: publishedAt ? new Date(publishedAt) : (status === PostStatus.PUBLISHED ? new Date() : null),
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        featuredImageUrl: featuredImageUrl || null,
        featuredImageAlt: featuredImageAlt || null,
        listingThumbnailUrl: listingThumbnailUrl || null,
        isFeatured: !!isFeatured,
        isPinned: !!isPinned,
        showTableOfContents: showTableOfContents !== undefined ? !!showTableOfContents : true,
        readTimeMinutes: Number(readTimeMinutes || 5),
        authors: authorIds && authorIds.length > 0 ? {
          create: authorIds.map((authorId: string, index: number) => ({
            authorId,
            sortOrder: index
          }))
        } : undefined,
        categories: categoryIds && categoryIds.length > 0 ? {
          create: categoryIds.map((categoryId: string) => ({ categoryId }))
        } : undefined,
        tags: tagIds && tagIds.length > 0 ? {
          create: tagIds.map((tagId: string) => ({ tagId }))
        } : undefined
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("POST /api/admin/posts error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
