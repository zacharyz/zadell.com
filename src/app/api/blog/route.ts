import { getAllPosts, hasBlogPosts } from "@/utils/blog";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const check = searchParams.get("check");

  if (check === "has-posts") {
    return NextResponse.json({ hasPosts: hasBlogPosts() });
  }

  const posts = getAllPosts();
  return NextResponse.json({ posts });
}
