export interface BlogPost {
  slug: string;
  content: string;
  title: string;
  date: string;
  description: string;
  readingTime: number;
  tags?: string[];
  coverImage?: string;
  draft?: boolean;
}

