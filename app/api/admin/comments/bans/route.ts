import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { BanType } from "@prisma/client";

// GET /api/admin/comments/bans
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bans = await prisma.commentBan.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(bans);
  } catch (error) {
    console.error("GET /api/admin/comments/bans error:", error);
    return NextResponse.json({ error: "Failed to fetch comment bans" }, { status: 500 });
  }
}

// POST /api/admin/comments/bans
export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, value, reason } = body; // type is BanType ("EMAIL" | "IP"), value is string, reason is optional

    if (!type || !value?.trim()) {
      return NextResponse.json({ error: "Type and Value are required" }, { status: 400 });
    }

    if (!Object.values(BanType).includes(type)) {
      return NextResponse.json({ error: "Invalid ban type" }, { status: 400 });
    }

    const val = value.trim().toLowerCase();

    // Check if ban already exists
    const exists = await prisma.commentBan.findUnique({
      where: {
        type_value: { type, value: val }
      }
    });

    if (exists) {
      return NextResponse.json({ error: "This ban entry already exists" }, { status: 400 });
    }

    const ban = await prisma.commentBan.create({
      data: {
        type,
        value: val,
        reason: reason || null
      }
    });

    return NextResponse.json(ban);
  } catch (error) {
    console.error("POST /api/admin/comments/bans error:", error);
    return NextResponse.json({ error: "Failed to create comment ban" }, { status: 500 });
  }
}

// DELETE /api/admin/comments/bans
export async function DELETE(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Ban ID is required" }, { status: 400 });
    }

    const deleted = await prisma.commentBan.delete({
      where: { id }
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE /api/admin/comments/bans error:", error);
    return NextResponse.json({ error: "Failed to delete comment ban" }, { status: 500 });
  }
}
