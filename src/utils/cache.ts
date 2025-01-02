import { BlogState } from '@/types/blog';

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

class BlogCache {
  private static instance: BlogCache;
  private cache: Map<string, BlogState>;

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): BlogCache {
    if (!BlogCache.instance) {
      BlogCache.instance = new BlogCache();
    }
    return BlogCache.instance;
  }

  get(key: string): BlogState | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.lastChecked > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return cached;
  }

  set(key: string, value: boolean): void {
    this.cache.set(key, {
      hasPosts: value,
      lastChecked: Date.now(),
    });
  }
}

export const blogCache = BlogCache.getInstance(); 