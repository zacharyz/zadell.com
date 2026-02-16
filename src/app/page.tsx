"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  const skills = [
    {
      name: "Architecture & Strategy",
      items: ["System Design", "Event-Driven Arch", "Microservices", "Tech Strategy"],
    },
    {
      name: "Full-Stack Engineering",
      items: ["Next.js", "TypeScript / Node", "React Server Components", "GraphQL Federation"],
    },
    {
      name: "AI Integration",
      items: ["RAG Pipelines", "Agentic Workflows", "LLM Integration", "Vector Search"],
    },
    {
      name: "Cloud & Infrastructure",
      items: ["AWS / Multi-Cloud", "Kubernetes / Docker", "Infrastructure as Code", "Zero Trust Security"],
    },
  ];

  const highlights = [
    {
      title: "Building threshold.fit",
      description:
        "Currently building a fitness platform that helps people train smarter. It's the product I wanted to exist, so I'm making it.",
      link: "https://threshold.fit",
    },
    {
      title: "20+ Years Shipping",
      description: "Nike, Facebook, Unity, and dozens of startups. I've built systems at every scale, from scrappy MVPs to platforms serving millions.",
    },
    {
      title: "Available for Consulting",
      description:
        "Architecture, AI integration, full-stack delivery. I help teams build the right thing the right way — then I help them ship it.",
      link: "/services",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 px-4 bg-background relative overflow-hidden flex items-center min-h-[90vh] strange-loop">
        <div className="absolute inset-0 opacity-10 chess-board pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left bg-paper ink-sketch p-12 relative z-20">
              <h1 className="text-6xl md:text-8xl mb-8 text-foreground font-serif leading-none tracking-tighter rough">
                I&apos;m Zac.<br />
                <span className="text-primary italic">I build things.</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground font-prose mb-12 max-w-xl">
                Full-stack engineer and consultant with 20+ years of experience. Currently building{" "}
                <a href="https://threshold.fit" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">threshold.fit</a>
                {" "}and helping teams ship through{" "}
                <span className="font-semibold">Zadell Consulting</span>.
              </p>
              <div className="flex flex-wrap gap-6">
                <a
                  href="/contact"
                  className="bg-primary text-primary-foreground px-10 py-5 text-xl rounded-none hover:translate-x-1 hover:translate-y-1 transition-all ink-sketch font-bold rough"
                >
                  Let&apos;s Talk
                </a>
                <a
                  href="/portfolio"
                  className="bg-background text-foreground px-10 py-5 text-xl rounded-none hover:-translate-x-1 hover:-translate-y-1 transition-all ink-sketch font-bold rough"
                >
                  See My Work
                </a>
              </div>
            </div>
            <div className="hidden lg:block relative group">
               <div className="absolute -inset-4 border-4 border-foreground rotate-6 group-hover:rotate-0 transition-transform duration-500" />
               <div className="absolute -inset-4 border-4 border-primary -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                  <div className="relative aspect-square overflow-hidden ink-sketch bg-card">
                   <Image
                    src={theme === "dark" ? "/images/logo_zz_escher_dark.jpg" : "/images/logo_zz_escher.jpg"}
                    alt="Zac Zadell"
                    fill
                    className="object-cover scale-125 hover:scale-135 transition-all duration-700"
                    priority
                  />
                  </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-32 px-4 border-y-4 border-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 chess-board" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className={`p-12 border-2 border-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-500 group bg-paper`}
              >
                <div className="text-4xl mb-6 font-serif opacity-20 group-hover:opacity-100 transition-opacity">0{index + 1}</div>
                <h3 className="text-3xl mb-4 font-serif italic">{highlight.title}</h3>
                <p className="text-lg leading-relaxed text-foreground font-prose">
                  {highlight.description}
                </p>
                {highlight.link && (
                  <a
                    href={highlight.link}
                    target={highlight.link.startsWith("http") ? "_blank" : undefined}
                    rel={highlight.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-block mt-4 text-sm font-serif italic border-b border-current opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    Learn more &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 px-4 bg-foreground text-paper relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl mb-20 text-center font-serif italic tracking-widest uppercase rough">
            What I Work With
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((category) => (
              <div
                key={category.name}
                className="p-8 border-2 border-background/20 hover:border-primary transition-colors flex flex-col justify-between relative group"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-8 text-primary font-serif">{category.name}</h3>
                  <div className="flex flex-col gap-4">
                    {category.items.map((skill) => (
                      <div
                        key={skill}
                        className="text-lg font-serif italic border-b border-background/10 pb-2 hover:translate-x-2 transition-transform cursor-default"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-foreground">
            Have a project in mind?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            I&apos;m taking on select consulting engagements. Let&apos;s talk about what you&apos;re building.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:rotate-3 transition-transform font-bold rough-border shadow-lg rough"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
