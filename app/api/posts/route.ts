import { getBlogPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[API] Failed to fetch blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
