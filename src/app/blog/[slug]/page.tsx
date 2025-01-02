import { getAllPosts, getPostBySlug } from '@/utils/blog';
import Markdown from 'markdown-to-jsx';

const CustomH1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl font-bold my-4">{children}</h1>
);

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamic = 'force-dynamic'

export const revalidate = 3600 // Regenerate pages every hour

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose lg:prose-xl">
          <Markdown options={{
            overrides: {
              h1: CustomH1,
              // Add more custom components here
            },
          }}>
            {post.content}
          </Markdown>
        </article>
      </div>
    </main>
  );
} 