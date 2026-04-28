export default function About() {
  return (
    <main className="min-h-screen bg-ground-raised pt-24 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-6">
          zadell.com · about
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-ink-primary leading-[1.1] mb-12 pb-8 border-b border-rule-subtle">
          About
        </h1>

        <article className="space-y-6 text-lg text-ink-primary leading-[1.8]">
          <p>
            I&apos;m Zac Zadell. I write essays here about engineering, philosophy, and training —
            the threads that keep showing up when I sit down to think.
          </p>
          <p>
            I&apos;ve been a software engineer for more than twenty years. I&apos;ve worked at Nike,
            Facebook, and Unity, and I&apos;ve shipped code at every scale, from scrappy MVPs to
            systems serving millions of people. Right now I&apos;m building{" "}
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
          <p>
            I live in Portland, Oregon. I run marathons. I read more than I write, and I&apos;m
            trying to fix that.
          </p>
          <p>
            This site is where the writing happens. No newsletter, no comments, no tracking. If
            something here is useful or annoying,{" "}
            <a href="/contact" className="text-accent-olive hover:underline">
              the contact form
            </a>{" "}
            is how to tell me.
          </p>
        </article>

        <footer className="mt-20 pt-8 border-t border-rule-subtle">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-4">
            Elsewhere
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em]">
            <a
              href="https://github.com/zacharyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim hover:text-ink-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/zacharyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim hover:text-ink-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://threshold.fit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim hover:text-ink-primary transition-colors"
            >
              threshold.fit
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
