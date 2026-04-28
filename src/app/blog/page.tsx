import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatPostDate } from "@/utils/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-ground-page pt-32 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-6">
            zadell.com · essays
          </div>
          <h1 className="font-serif text-5xl text-ink-primary mb-4">Writing</h1>
          <p className="text-ink-secondary leading-relaxed">
            Personal essays on engineering, philosophy, and training.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="border-t border-rule-subtle pt-8 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
            First essays in progress.
          </div>
        ) : (
          <div className="border-t border-rule-subtle">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block border-b border-rule-subtle bg-ground-raised hover:border-rule-strong transition-colors group"
              >
                {post.coverImage && (
                  <div className="relative aspect-[3/2] border-b border-rule-subtle overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-4">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span className="mx-2">·</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h2 className="font-serif text-2xl text-ink-primary mb-3 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-ink-secondary leading-relaxed">{post.description}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
                      {post.tags.join(" · ")}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
