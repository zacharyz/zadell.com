import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

class BlogError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlogError";
  }
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function buildPost(slug: string, content: string, data: Record<string, unknown>): BlogPost {
  if (!data.title || !data.date || !data.description) {
    throw new BlogError(`Missing required fields in ${slug}.md`);
  }

  return {
    slug,
    content,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    readingTime: calculateReadingTime(content),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
    draft: data.draft === true,
  };
}

const isDraftHidden = process.env.NODE_ENV === "production";

function visible(post: BlogPost): boolean {
  return !post.draft || !isDraftHidden;
}

export function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return buildPost(slug, content, data);
      })
      .filter(visible);

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const post = buildPost(slug, content, data);
    return visible(post) ? post : null;
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

