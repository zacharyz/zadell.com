import Link from 'next/link';
import { getAllPosts } from '@/utils/blog';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-6">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                  {post.title}
                </h2>
              </Link>
              <div className="text-gray-600 mb-2">{post.date}</div>
              <p className="text-gray-700">{post.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 