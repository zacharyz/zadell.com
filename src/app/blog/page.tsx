import Link from 'next/link';
import { getAllPosts } from '@/utils/blog';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Blog Posts</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="border-b border-gray-200 dark:border-gray-700 pb-6"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 mb-2">
                  {post.title}
                </h2>
              </Link>
              <div className="text-gray-600 dark:text-gray-400 mb-2">{post.date}</div>
              <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 