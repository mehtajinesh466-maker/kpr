import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, incrementPostViews } from "@/lib/blog";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (request.nextUrl.searchParams.get("trackView") === "true") {
      await incrementPostViews(params.slug);
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(`GET /api/posts/${params.slug}`, error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
