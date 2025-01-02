export interface BlogPost {
  slug: string;
  content: string;
  title: string;
  date: string;
  description: string;
}

export interface BlogState {
  hasPosts: boolean;
  lastChecked: number;
} 