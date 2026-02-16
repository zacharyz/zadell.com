"use client";

import React from "react";
import {
  SiPython,
  SiNextdotjs,
  SiReact,
  SiAstro,
  SiPrisma,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link?: string;
  icon: React.ReactElement<{ className?: string }>;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "threshold.fit",
    description:
      "A fitness platform I'm building from scratch to help people train smarter. Personalized programming, progress tracking, and AI-powered coaching — the product I wanted to exist.",
    technologies: [
      "Next.js",
      "TypeScript",
      "AI Integration",
      "Full-Stack",
    ],
    imageUrl: "/modelchat.jpg",
    link: "https://threshold.fit",
    icon: <SiNextdotjs className="w-16 h-16 text-primary" />,
    featured: true,
  },
  {
    title: "ModelChat",
    description:
      "A chat app that lets you talk to any AI model through one interface. Built on a streaming architecture with real-time token generation and a unified API layer across providers.",
    technologies: [
      "Next.js 15",
      "Streaming Architecture",
      "OpenRouter API",
      "Edge Computing",
    ],
    imageUrl: "/modelchat.jpg",
    link: "https://github.com/zacharyz/modelchat",
    icon: <SiNextdotjs className="w-16 h-16 text-primary" />,
  },
  {
    title: "Workflow Summarization Engine",
    description:
      "A document analysis system for high-throughput legal and medical processing. Uses parallelized LLM chains to break down, analyze, and synthesize large documents into structured summaries.",
    technologies: [
      "Python / LangChain",
      "Map-Reduce Patterns",
      "Context Window Mgmt",
      "Vector Embeddings",
    ],
    imageUrl: "/workflow-lib.jpg",
    icon: <SiPython className="w-16 h-16 text-primary" />,
  },
  {
    title: "Document Generation Library",
    description:
      "An enterprise document synthesis library that separates data logic from presentation. Custom template engine that renders data-driven reports into pixel-perfect PDFs and DOCX files.",
    technologies: [
      "Python / Jinja2",
      "Headless Rendering",
      "Dynamic Templating",
      "Format Standardization",
    ],
    imageUrl: "/doc-gen-lib.jpg",
    icon: <SiPython className="w-16 h-16 text-primary" />,
  },
  {
    title: "Discuss Forum",
    description:
      "A threaded discussion platform with recursive comment trees and real-time state sync. Built to explore relational data architecture and optimistic UI patterns.",
    technologies: [
      "Next.js 14 / Server Actions",
      "Recursive Queries",
      "Optimistic UI",
      "Auth Strategy",
    ],
    imageUrl: "/discuss-forum.jpg",
    icon: <SiNextdotjs className="w-16 h-16 text-primary" />,
  },
  {
    title: "AstroJS Site",
    description:
      "An experiment with the Islands Architecture pattern — selectively hydrating interactive components within static HTML to achieve near-zero Time to Interactive and strong SEO.",
    technologies: [
      "Astro.js",
      "Islands Architecture",
      "Partial Hydration",
      "Core Web Vitals",
    ],
    imageUrl: "/astro-portfolio.jpg",
    icon: <SiAstro className="w-16 h-16 text-primary" />,
  },
  {
    title: "Crypto Exchange Architecture",
    description:
      "Lead frontend architecture for a top-tier cryptocurrency exchange. High-frequency WebSocket state management, real-time financial visualization, and bank-grade security for millions of daily users.",
    technologies: [
      "React / Redux",
      "WebSockets",
      "D3.js Visualization",
      "Cryptography",
    ],
    imageUrl: "/crypto.jpg",
    link: undefined,
    icon: <SiNextdotjs className="w-16 h-16 text-primary" />,
  },
  {
    title: "Multi-Cloud Infrastructure",
    description:
      "An early multi-cloud deployment platform built in the pre-Docker era. Designed a universal add-on system bridging proprietary cloud APIs with third-party SaaS integrations.",
    technologies: [
      "Distributed Systems",
      "Cloud Orchestration",
      "Systems Architecture",
      "API Design",
    ],
    imageUrl: "/cloud.jpg",
    link: undefined,
    icon: <SiPython className="w-16 h-16 text-primary" />,
  },
  {
    title: "Xbox 360 Game Engine",
    description:
      "A custom game engine for Xbox 360 built from the metal up. HLSL shaders, rigid body physics, and particle systems — all within the console's strict memory constraints.",
    technologies: [
      "C# / .NET",
      "HLSL Shaders",
      "Physics Mathematics",
      "Memory Optimization",
    ],
    imageUrl: "/engine.jpg",
    link: undefined,
    icon: <SiReact className="w-16 h-16 text-primary" />,
  },
  {
    title: "Fintech Platform",
    description:
      "Led creation of a secure e-commerce platform for a major fintech company. Designed the transactional core, payment gateway integrations, and PCI-compliant data flows.",
    technologies: [
      "Enterprise Architecture",
      "Payment Gateways",
      "PCI Compliance",
      "High Availability",
    ],
    imageUrl: "/fintech.jpg",
    link: undefined,
    icon: <SiPrisma className="w-16 h-16 text-primary" />,
  },
];

export default function Portfolio() {
  return (
    <div className="pt-40 px-4 bg-background strange-loop min-h-screen">
      <div className="max-w-7xl mx-auto py-16">
        <div className="mb-24 relative">
          <h1 className="text-7xl font-serif font-black mb-8 tracking-tighter uppercase italic border-b-8 border-foreground inline-block rough">
            Selected <br/>
            <span className="text-primary italic">Work</span>
          </h1>
          <p className="text-xl font-prose text-foreground max-w-2xl mt-8">
            A mix of products I&apos;ve built, client work, and side projects spanning two decades of engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group relative bg-paper ink-sketch p-8 hover:-translate-y-2 transition-all duration-500 overflow-hidden ${
                project.link ? "cursor-pointer" : ""
              } ${project.featured ? "md:col-span-2 lg:col-span-1 ring-2 ring-primary" : ""}`}
              onClick={() =>
                project.link && window.open(project.link, project.link.startsWith("http") ? "_blank" : "_self")
              }
            >
               {/* Background Glyph */}
               <div className="absolute -bottom-12 -right-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform rotate-12 scale-150">
                  {React.cloneElement(project.icon, { className: "w-64 h-64 text-foreground" })}
               </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 flex items-center justify-between">
                    <div className="p-4 border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                        {project.icon}
                    </div>
                    {project.link && (
                        <span className="font-serif italic text-sm border-b border-primary text-primary">View Project &rarr;</span>
                    )}
                </div>

                {project.featured && (
                  <div className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">
                    Currently Building
                  </div>
                )}

                <h3 className="text-3xl font-serif font-black mb-4 tracking-tighter italic rough">
                  {project.title}
                </h3>

                <p className="text-lg text-foreground mb-8 leading-relaxed font-prose flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 border border-foreground/30 font-serif italic text-sm hover:border-primary hover:text-primary transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
