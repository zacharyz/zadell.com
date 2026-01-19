import Link from "next/link";
import { getAllPosts } from "@/utils/blog";

export const dynamic = "force-dynamic";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen pt-40 bg-background strange-loop">
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <h1 className="text-6xl font-serif font-black mb-16 text-foreground tracking-tighter uppercase rotate-1 rough">
          Manuscripts from <br />
          <span className="text-primary font-serif italic">The Looking Glass</span>
        </h1>
        <div className="space-y-12">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-paper ink-sketch p-8 hover:translate-x-2 transition-transform cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-4xl font-bold text-foreground hover:text-primary mb-4 tracking-tight leading-none rough">
                  {post.title}
                </h2>
              </Link>
              <div className="text-primary font-bold italic mb-6 tracking-widest uppercase text-sm">
                &mdash; {post.date}
              </div>
              <p className="text-xl text-foreground/80 leading-relaxed">
                {post.description}
              </p>
              <div className="mt-8 flex justify-end">
                <Link href={`/blog/${post.slug}`} className="text-primary font-bold hover:underline rough">
                  READ MORE &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
