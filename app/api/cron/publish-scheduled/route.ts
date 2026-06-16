import { NextRequest, NextResponse } from "next/server";
import { publishScheduledPosts } from "@/lib/blog";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await publishScheduledPosts();
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/cron/publish-scheduled", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
