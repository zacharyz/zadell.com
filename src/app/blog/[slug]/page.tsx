import { getAllPosts, getPostBySlug } from '@/utils/blog';
import Markdown from 'markdown-to-jsx';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Regenerate pages every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  // Await the params
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return null;

  const contentWithoutTitle = post.content
    .split('\n')
    .filter(line => !line.trim().startsWith('# '))
    .join('\n');

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
        <div className="text-gray-600 dark:text-gray-400 mb-8">{post.date}</div>
        <article className="prose dark:prose-invert prose-lg max-w-none
          prose-headings:text-gray-900 prose-headings:dark:text-gray-100
          prose-p:text-gray-700 prose-p:dark:text-gray-300
          prose-a:text-blue-600 prose-a:dark:text-blue-400
          prose-blockquote:border-blue-500 prose-blockquote:dark:border-blue-400
          prose-code:bg-gray-100 prose-code:dark:bg-gray-800
          prose-pre:bg-gray-100 prose-pre:dark:bg-gray-800">
          <Markdown>{contentWithoutTitle}</Markdown>
        </article>
      </div>
    </main>
  );
} 