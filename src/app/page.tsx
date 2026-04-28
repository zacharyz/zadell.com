import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/utils/blog";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <main className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-5xl text-ink-primary mb-12 leading-tight">Zac Zadell</h1>

        <article className="space-y-6 text-lg text-ink-primary leading-[1.8]">
          <p>
            I&apos;m a software engineer in Portland. I write essays on engineering, philosophy,
            and training — the threads that keep showing up when I sit down to think.
          </p>
          <p>
            Right now I&apos;m building{" "}
            <a
              href="https://threshold.fit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-olive hover:underline"
            >
              threshold.fit
            </a>
            , the fitness platform I wish existed.
          </p>
          <p>This site is where the writing happens.</p>
        </article>

        {posts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-rule-subtle">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-10">
              Recent essays
            </div>
            <ul className="space-y-10 mb-12">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-3">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span className="mx-2">·</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h2 className="font-serif text-2xl text-ink-primary group-hover:text-accent-olive transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-ink-secondary leading-relaxed">{post.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-ink-dim hover:text-ink-primary transition-colors"
            >
              All essays →
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
