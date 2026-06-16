import { NextRequest, NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/blog";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const result = await getPublishedPosts({
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 12),
      category: searchParams.get("category") ?? undefined,
      tag: searchParams.get("tag") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      featured: searchParams.get("featured") === "true",
      sort: (searchParams.get("sort") as "latest" | "popular") ?? "latest",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/posts", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
