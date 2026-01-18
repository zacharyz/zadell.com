"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const [showBlogLink, setShowBlogLink] = useState(false);

  useEffect(() => {
    async function checkBlogPosts() {
      try {
        const response = await fetch("/api/blog?check=has-posts");
        const data = await response.json();
        setShowBlogLink(data.hasPosts);
      } catch (error) {
        console.error("Error checking blog posts:", error);
        setShowBlogLink(false);
      }
    }

    checkBlogPosts();
  }, []);

  const skills = [
    {
      name: "Strategic Architecture",
      items: ["System Design", "Event-Driven Arch", "Microservices", "Tech Strategy"],
      symbol: "Σ",
    },
    { 
      name: "Full-Stack Engineering", 
      items: ["Next.js", "TypeScript / Node", "React Server Components", "GraphQL Federation"],
      symbol: "λ",
    },
    { 
      name: "AI & Cognitive Systems",
      items: ["RAG Pipelines", "Agentic Workflows", "LLM Integration", "Vector Search"],
      symbol: "Δ",
    },
    { 
      name: "Cloud Sovereignty", 
      items: ["AWS / Multi-Cloud", "Kubernetes / Docker", "Infrastructure as Code", "Zero Trust Security"],
      symbol: "∞",
    },
  ];

  const highlights = [
    {
      title: "Two Decades of Craftsmanship",
      description:
        "From the early web to the age of AI, I've spent over two decades building resilient, scalable systems that stand the test of time.",
    },
    {
      title: "Principal Leadership",
      description: "Driving technical strategy, mentoring senior engineers, and defining the engineering culture for distributed teams.",
    },
    {
      title: "System Sovereignty",
      description:
        "True full-stack mastery means owning the outcome. From distributed backend architectures to pixel-perfect UIs, nothing is black boed.",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section - Down the Rabbit Hole */}
      <section className="py-24 px-4 bg-background relative overflow-hidden flex items-center min-h-[90vh] strange-loop">
        <div className="absolute inset-0 opacity-10 chess-board pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="mb-4 text-primary font-bold tracking-widest text-sm uppercase">Entering the Strange Loop</div>
              <h1 className="text-6xl md:text-8xl mb-8 text-foreground font-serif leading-none tracking-tighter">
                Curiouser & <br />
                <span className="text-primary italic">Curiouser</span>
              </h1>
              <p className="text-2xl md:text-3xl text-foreground font-prose mb-12 max-w-xl">
                &quot;I wonder if I&apos;ve been changed in the night? Let me think: was I the same when I got up this morning?&quot;
              </p>
              <div className="flex flex-wrap gap-6">
                <a
                  href="/contact"
                  className="bg-primary text-primary-foreground px-10 py-5 text-xl rounded-none hover:translate-x-1 hover:translate-y-1 transition-all ink-sketch font-bold"
                >
                  Start a Project
                </a>
                <a
                  href="/portfolio"
                  className="bg-background text-foreground px-10 py-5 text-xl rounded-none hover:-translate-x-1 hover:-translate-y-1 transition-all ink-sketch font-bold"
                >
                  View Work
                </a>
              </div>
            </div>
            <div className="hidden lg:block relative group">
               <div className="absolute -inset-4 border-4 border-foreground rotate-6 group-hover:rotate-0 transition-transform duration-500" />
               <div className="absolute -inset-4 border-4 border-primary -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                  <div className="relative aspect-square overflow-hidden ink-sketch bg-card">
                   <Image
                    src={theme === "dark" ? "/images/logo_zz_escher_dark.jpg" : "/images/logo_zz_escher.jpg"}
                    alt="ZZ Escher Branding - The Strange Loop"
                    fill
                    className="object-cover scale-125 hover:scale-135 transition-all duration-700"
                    priority
                  />
                  </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section - Chess Board Theme */}
      <section className="py-32 px-4 border-y-4 border-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 chess-board" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className={`p-12 border-2 border-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-500 group ${
                  index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                }`}
              >
                <div className="text-4xl mb-6 font-serif opacity-20 group-hover:opacity-100 transition-opacity">0{index + 1}</div>
                <h3 className="text-3xl mb-4 font-serif italic">{highlight.title}</h3>
                <p className="text-lg leading-relaxed text-foreground font-prose">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - The Logic of Wonderland */}
      <section className="py-32 px-4 bg-foreground text-background relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl mb-20 text-center font-serif italic tracking-widest uppercase">
            The Strange Loop of Skills
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
                <div className="absolute bottom-4 right-4 text-7xl text-background/15 font-serif select-none pointer-events-none group-hover:text-primary/20 transition-colors">
                  {category.symbol}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute top-0 right-1/4 text-9xl font-serif opacity-5 rotate-12 select-none pointer-events-none text-foreground">
          ♞
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-foreground">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let&apos;s collaborate to bring your vision to life with
            cutting-edge technology.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:rotate-3 transition-transform font-bold rough-border shadow-lg"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
