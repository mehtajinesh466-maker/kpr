import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CommentStatus } from "@/lib/generated/prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, parentId, authorName, authorEmail, content } = body;

    if (!postId || !authorName?.trim() || !authorEmail?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const email = authorEmail.trim().toLowerCase();
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      undefined;

    const banned = await prisma.commentBan.findFirst({
      where: {
        OR: [
          { type: "EMAIL", value: email },
          ...(ipAddress ? [{ type: "IP" as const, value: ipAddress }] : []),
        ],
      },
    });

    if (banned) {
      return NextResponse.json({ error: "Unable to submit comment" }, { status: 403 });
    }

    if (parentId) {
      const parent = await prisma.comment.findUnique({
        where: { id: parentId },
        include: { parent: true },
      });

      if (!parent || parent.postId !== postId) {
        return NextResponse.json({ error: "Invalid parent comment" }, { status: 400 });
      }

      if (parent.parentId) {
        return NextResponse.json(
          { error: "Replies are limited to 2 levels deep" },
          { status: 400 }
        );
      }
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        parentId: parentId ?? null,
        authorName: authorName.trim(),
        authorEmail: email,
        content: content.trim(),
        status: CommentStatus.PENDING,
        ipAddress,
      },
    });

    return NextResponse.json(
      { message: "Comment submitted for moderation", id: comment.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/comments", error);
    return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 });
  }
}
