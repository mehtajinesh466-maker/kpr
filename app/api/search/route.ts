import { NextRequest, NextResponse } from "next/server";
import { searchPosts } from "@/lib/blog";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q") ?? "";
    const limit = Number(request.nextUrl.searchParams.get("limit") ?? 10);
    const results = await searchPosts(q, limit);

    return NextResponse.json({ query: q, results });
  } catch (error) {
    console.error("GET /api/search", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
