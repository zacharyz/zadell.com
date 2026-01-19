"use client";

import React from "react";
import {
  SiPython,
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiAstro,
  SiPrisma,
} from "react-icons/si";

interface Project {
  title: string;
  themeTitle: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link?: string;
  icon: React.ReactElement<{ className?: string }>;
}

const projects: Project[] = [
  {
    title: "ModelChat",
    themeTitle: "The Neural Interface",
    description:
      "A unified cognitive interface orchestrating communication across distinct LLM providers. Built on a streaming architecture to handle real-time token generation, this system abstracts model complexity behind a standardized API layer.",
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
    themeTitle: "The Cognitive Pipeline",
    description:
      "A distributed document analysis system designed for high-throughput legal and medical processing. Implements parallelized LLM chains to deconstruct, analyze, and synthesize unlimited context windows into structured intelligence.",
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
    themeTitle: "The Fabrication Engine",
    description:
      "An enterprise-grade document synthesis library decoupling data logic from presentation. Features a custom template engine capable of rendering complex, data-driven reports into pixel-perfect PDF and DOCX artifacts.",
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
    themeTitle: "The Dialectic Forum",
    description:
      "A study in relational data architecture and optimistic UI patterns. This platform implements recursive threading models and real-time state synchronization to facilitate complex, multi-branching discourse.",
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
    themeTitle: "The Static Monolith",
    description:
      "Experiments in the 'Islands Architecture' pattern. By selectively hydrating interactive components within a sea of static HTML, this project achieves near-zero Time to Interactive (TTI) and maximum SEO authority.",
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
    themeTitle: "The Immutable Exchange",
    description:
      "Lead frontend architecture for a top-tier cryptocurrency exchange. Orchestrated high-frequency WebSocket state management, real-time financial visualization, and bank-grade security protocols for millions of daily active users.",
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
    themeTitle: "The Proto-Container Cloud",
    description:
      "Engineered an early multi-cloud deployment platform in the pre-Docker era. Spearheaded a universal add-on system that bridged proprietary cloud APIs with 3rd-party SaaS integrations, laying the groundwork for modern orchestration.",
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
    themeTitle: "The Reality Engine",
    description:
      "Developed a custom high-performance game engine for Xbox 360 from the metal up. Implemented advanced HLSL shaders, rigid body physics simulation, and particle systems within strictly constrained console memory limits.",
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
    themeTitle: "The Commerce Core",
    description:
      "Spearheaded the creation of a secure e-commerce platform for a major fintech entity. Designed the transactional core, payment gateway integrations, and PCI-compliant data flows handling substantial monetary volume.",
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
            The Gallery <br/>
            <span className="text-primary italic">of Impossible Works</span>
          </h1>
          <p className="text-xl font-prose text-foreground max-w-2xl mt-8">
            "Artifacts from the forge. Here, abstract architecture becomes tangible reality."
          </p>
          <div className="absolute top-0 right-0 md:right-20 text-9xl font-serif opacity-5 select-none pointer-events-none">
            &Omega;
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative bg-paper ink-sketch p-8 hover:-translate-y-2 transition-all duration-500 overflow-hidden ${
                project.link ? "cursor-pointer" : ""
              }`}
              onClick={() =>
                project.link && (window.location.href = project.link)
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
                        <span className="font-serif italic text-sm border-b border-primary text-primary">View Artifact &rarr;</span>
                    )}
                </div>

                <h3 className="text-3xl font-serif font-black mb-2 tracking-tighter italic rough">
                  {project.themeTitle}
                </h3>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-bold">
                    Code Name: {project.title}
                </div>

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
