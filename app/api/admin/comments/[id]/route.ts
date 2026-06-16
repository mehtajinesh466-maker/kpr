import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { CommentStatus } from "@/lib/generated/prisma/client";

interface RouteParams {
  params: { id: string };
}

// PUT /api/admin/comments/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { content, status } = body;

    const currentComment = await prisma.comment.findUnique({
      where: { id: params.id }
    });

    if (!currentComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const updated = await prisma.comment.update({
      where: { id: params.id },
      data: {
        content: content !== undefined ? content.trim() : currentComment.content,
        status: status !== undefined ? status : currentComment.status
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/admin/comments/[id] error:", error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

// DELETE /api/admin/comments/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: params.id }
    });
    return NextResponse.json(deletedComment);
  } catch (error) {
    console.error("DELETE /api/admin/comments/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
