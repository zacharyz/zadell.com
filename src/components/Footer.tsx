import Link from "next/link";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/zacharyz" },
  { name: "LinkedIn", url: "https://linkedin.com/in/zacharyz" },
  { name: "threshold.fit", url: "https://threshold.fit" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rule-subtle">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="hover:text-ink-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim/70">
            &copy; {currentYear} Zac Zadell
          </p>
        </div>
      </div>
    </footer>
  );
}
