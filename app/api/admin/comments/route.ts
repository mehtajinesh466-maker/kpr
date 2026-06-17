import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { CommentStatus } from "@prisma/client";

// GET /api/admin/comments
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const statusParam = searchParams.get("status"); // PENDING, APPROVED, REJECTED, SPAM or ALL

    const whereClause: any = {};
    if (statusParam && statusParam !== "ALL") {
      whereClause.status = statusParam;
    }

    const comments = await prisma.comment.findMany({
      where: whereClause,
      include: {
        post: { select: { title: true, slug: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/admin/comments error:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// PUT /api/admin/comments (Bulk moderation)
export async function PUT(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { ids, status } = body; // ids is string[], status is CommentStatus

    if (!ids || !Array.isArray(ids) || ids.length === 0 || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Object.values(CommentStatus).includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await prisma.comment.updateMany({
      where: { id: { in: ids } },
      data: { status }
    });

    return NextResponse.json({ message: `Successfully updated ${updated.count} comments.` });
  } catch (error) {
    console.error("PUT /api/admin/comments error:", error);
    return NextResponse.json({ error: "Failed to bulk update comments" }, { status: 500 });
  }
}
