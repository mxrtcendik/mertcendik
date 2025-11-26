import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const memoryViews = new Map<string, number>();

function isEnabled() {
  return (
    process.env.VIEW_COUNTER_ENABLED === "true" &&
    !!process.env.UPSTASH_REDIS_REST_URL &&
    !!process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

function getViewKey(slug: string) {
  return ["pageviews", "projects", "mertcendik", slug].join(":");
}

function getDedupKey(ip: string, slug: string) {
  return ["pageviews", "projects", "mertcendik", "dedup", ip, slug].join(":");
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    let count: number;
    if (isEnabled()) {
      count = (await redis.get<number>(getViewKey(slug))) ?? 0;
    } else {
      count = memoryViews.get(slug) ?? 0;
    }
    return NextResponse.json({ views: count });
  } catch (error) {
    console.error("[Views] Error fetching views for slug:", slug, error);
    return NextResponse.json({ views: 0 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  if (!isEnabled()) {
    const current = memoryViews.get(slug) ?? 0;
    memoryViews.set(slug, current + 1);
    return NextResponse.json({ views: current + 1 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const viewKey = getViewKey(slug);
  const dedupKey = getDedupKey(ip, slug);

  try {
    const hasViewed = await redis.get(dedupKey);

    if (!hasViewed) {
      const pipeline = redis.pipeline();
      pipeline.incr(viewKey);
      pipeline.set(dedupKey, "true", { ex: 86400 });
      await pipeline.exec();
    }

    const views = (await redis.get<number>(viewKey)) ?? 0;
    return NextResponse.json({ views });
  } catch (error) {
    console.error("[Views] Error updating views for slug:", slug, error);
    const fallbackViews = memoryViews.get(slug) ?? 0;
    return NextResponse.json({ views: fallbackViews });
  }
}
