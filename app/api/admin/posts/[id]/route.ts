import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { PostStatus } from "@/lib/generated/prisma/client";

interface RouteParams {
  params: { id: string };
}

// GET /api/admin/posts/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        authors: { select: { authorId: true } },
        categories: { select: { categoryId: true } },
        tags: { select: { tagId: true } },
        revisions: {
          orderBy: { createdAt: "desc" },
          include: { author: { select: { name: true } } }
        }
      }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Format relationship fields as flat arrays for easy form state binding
    const formattedPost = {
      ...post,
      authorIds: post.authors.map((a) => a.authorId),
      categoryIds: post.categories.map((c) => c.categoryId),
      tagIds: post.tags.map((t) => t.tagId)
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error("GET /api/admin/posts/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT /api/admin/posts/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
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
      tagIds,
      editorAuthorId // ID of the author making this edit (for revision history attribution)
    } = body;

    const currentPost = await prisma.post.findUnique({
      where: { id: params.id },
      include: { authors: true }
    });

    if (!currentPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // 1. Create Revision from the CURRENT post content before modifying
    const firstAuthorId = editorAuthorId || currentPost.authors[0]?.authorId || null;
    await prisma.postRevision.create({
      data: {
        postId: params.id,
        authorId: firstAuthorId,
        title: currentPost.title,
        excerpt: currentPost.excerpt,
        content: currentPost.content || { type: "doc", content: [] },
        metadata: {
          metaTitle: currentPost.metaTitle,
          metaDescription: currentPost.metaDescription,
          focusKeyword: currentPost.focusKeyword,
          canonicalUrl: currentPost.canonicalUrl,
          featuredImageUrl: currentPost.featuredImageUrl,
          featuredImageAlt: currentPost.featuredImageAlt,
          status: currentPost.status
        }
      }
    });

    // 2. Cap revisions at a strict 10-tier database boundary
    const revisions = await prisma.postRevision.findMany({
      where: { postId: params.id },
      orderBy: { createdAt: "desc" }
    });

    if (revisions.length > 9) {
      const oldestRevisions = revisions.slice(9); // Keep the newest 9 (plus the 1 we just added = 10 max)
      await prisma.postRevision.deleteMany({
        where: { id: { in: oldestRevisions.map((r) => r.id) } }
      });
    }

    // 3. Clear existing relations to re-insert them cleanly
    await prisma.postAuthor.deleteMany({ where: { postId: params.id } });
    await prisma.postCategory.deleteMany({ where: { postId: params.id } });
    await prisma.postTag.deleteMany({ where: { postId: params.id } });

    // 4. Update the post
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        slug: slug || currentPost.slug,
        excerpt: excerpt || null,
        content: content || { type: "doc", content: [] },
        contentHtml: contentHtml || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        focusKeyword: focusKeyword || null,
        canonicalUrl: canonicalUrl || null,
        status: status || currentPost.status,
        publishedAt: publishedAt ? new Date(publishedAt) : (status === PostStatus.PUBLISHED ? new Date() : currentPost.publishedAt),
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        featuredImageUrl: featuredImageUrl || null,
        featuredImageAlt: featuredImageAlt || null,
        listingThumbnailUrl: listingThumbnailUrl || null,
        isFeatured: isFeatured !== undefined ? !!isFeatured : currentPost.isFeatured,
        isPinned: isPinned !== undefined ? !!isPinned : currentPost.isPinned,
        showTableOfContents: showTableOfContents !== undefined ? !!showTableOfContents : currentPost.showTableOfContents,
        readTimeMinutes: Number(readTimeMinutes || currentPost.readTimeMinutes),
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

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("PUT /api/admin/posts/[id] error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/admin/posts/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deletedPost = await prisma.post.delete({
      where: { id: params.id }
    });
    return NextResponse.json(deletedPost);
  } catch (error) {
    console.error("DELETE /api/admin/posts/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
