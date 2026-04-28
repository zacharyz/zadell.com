import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/utils/blog";
import Markdown from "markdown-to-jsx";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const contentWithoutTitle = post.content
    .split("\n")
    .filter((line) => !line.trim().startsWith("# "))
    .join("\n");

  return (
    <main className="min-h-screen bg-ground-raised pt-24 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-ink-dim hover:text-ink-primary transition-colors mb-16"
        >
          ← Essays
        </Link>

        {post.coverImage && (
          <div className="relative aspect-[3/2] border border-rule-subtle mb-16 overflow-hidden">
            <Image
              src={post.coverImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        )}

        <header className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-6 pb-6 border-b border-rule-subtle">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="mx-2">·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-primary leading-[1.1] mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed">{post.description}</p>
        </header>

        <article
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-ink-primary prose-headings:font-normal
            prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-3xl
            prose-h3:font-sans prose-h3:font-semibold prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4
            prose-p:text-ink-primary prose-p:leading-[1.8]
            prose-a:text-accent-olive prose-a:font-normal prose-a:no-underline hover:prose-a:underline
            prose-strong:text-ink-primary prose-strong:font-semibold
            prose-em:text-ink-primary
            prose-blockquote:border-l-2 prose-blockquote:border-accent-olive prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-ink-secondary prose-blockquote:pl-6
            prose-img:my-12 prose-img:rounded-none
            prose-code:text-ink-primary prose-code:bg-accent-olive-muted prose-code:rounded-none prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-ink-primary prose-pre:text-ground-page prose-pre:rounded-none
            prose-ul:text-ink-primary prose-ol:text-ink-primary
            prose-hr:border-rule-subtle"
        >
          <Markdown>{contentWithoutTitle}</Markdown>
        </article>

        <footer className="mt-20 pt-8 border-t border-rule-subtle">
          {post.tags && post.tags.length > 0 && (
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-4">
              {post.tags.join(" · ")}
            </div>
          )}
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
            by Zach
          </div>
        </footer>
      </div>
    </main>
  );
}
