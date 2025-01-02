import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types/blog';
import { blogCache } from './cache';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

class BlogError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BlogError';
  }
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      if (!data.title || !data.date || !data.description) {
        throw new BlogError(`Missing required fields in ${fileName}`);
      }

      return {
        slug,
        content,
        ...(data as { title: string; date: string; description: string })
      };
    });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (!data.title || !data.date || !data.description) {
      throw new BlogError(`Missing required fields in ${slug}.md`);
    }

    return {
      slug,
      content,
      ...(data as { title: string; date: string; description: string })
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

export function hasBlogPosts(): boolean {
  try {
    const cached = blogCache.get('hasPosts');
    if (cached) {
      return cached.hasPosts;
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const hasFiles = fileNames.length > 0;
    blogCache.set('hasPosts', hasFiles);
    return hasFiles;
  } catch (error) {
    console.error('Error checking blog posts:', error);
    return false;
  }
} 