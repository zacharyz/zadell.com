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

// Add interface for project type
interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "ModelChat",
    description:
      "A versatile LLM chat interface built with Next.js that leverages OpenRouter to communicate with various large language models. Features a modern UI, real-time streaming responses, and support for multiple AI models.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "OpenRouter",
      "Tailwind CSS",
      "Server Components",
      "Streaming SSE",
    ],
    imageUrl: "/modelchat.jpg", // Add actual image later
    link: "https://github.com/zacharyz/modelchat",
  },
  {
    title: "Workflow Summarization Engine",
    description:
      "A robust document processing and summarization pipeline library for medical and legal document analysis, featuring AI integration, parallel processing, and extensive workflow management capabilities.",
    technologies: [
      "Python",
      "GPT-4",
      "LangChain",
      "OpenAI",
      "Gemini",
      "PDF Processing",
    ],
    imageUrl: "/workflow-lib.jpg", // Add actual image later
  },
  {
    title: "Document Generation Library",
    description:
      "A versatile Python library for generating professional PDF and DOCX reports from various data sources. Features template-based generation, HTML rendering capabilities, Markdown support, and flexible JSON data integration for dynamic document creation.",
    technologies: [
      "Python",
      "PDF Generation",
      "Jinja2",
      "Markdown",
      "JSON",
      "Template Engine",
    ],
    imageUrl: "/doc-gen-lib.jpg", // Add actual image later
  },
  {
    title: "Discuss - Modern Discussion Forum",
    description:
      "A full-stack discussion forum platform built with Next.js 14, featuring real-time interactions, GitHub OAuth authentication, and nested comment threading. Implements modern web development practices with server components and optimistic UI updates.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "NextAuth.js",
      "NextUI",
      "Tailwind CSS",
      "GitHub OAuth",
    ],
    imageUrl: "/discuss-forum.jpg", // Add actual image later
  },
  {
    title: "AstroJS Business Website",
    description:
      "A modern, performance-focused website built with Astro.js, featuring comprehensive SEO optimization, static site generation, and MDX content management. Implements best practices for asset optimization and maintains exceptional lighthouse scores.",
    technologies: [
      "Astro.js",
      "TypeScript",
      "Tailwind CSS",
      "MDX",
      "SEO Optimization",
      "Static Generation",
    ],
    imageUrl: "/astro-portfolio.jpg", // Add actual image later
  },
  {
    title: "Code Snippet Manager",
    description:
      "A full-stack Next.js 14 application for managing code snippets, featuring Monaco Editor integration, server-side rendering, and real-time editing capabilities. Implements server actions, optimistic updates, and type-safe database operations.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "Monaco Editor",
      "Tailwind CSS",
      "Server Actions",
    ],
    imageUrl: "/snippet-manager.jpg", // Add actual image later
  },
  {
    title: "Precision Health Calculator",
    description:
      "A comprehensive health metrics calculator built with React, providing advanced body composition analysis and weight management projections. Features dual unit system support, real-time calculations, and scientific formula implementations for BMI, body fat percentage, and TDEE.",
    technologies: [
      "React",
      "TypeScript",
      "shadcn/ui",
      "Tailwind CSS",
      "Form Validation",
    ],
    imageUrl: "/health-calc.jpg",
    link: "/experiments/health-calculator",
  },

  // Add more projects
];

function getGradientClass(index: number): string {
  const gradients = [
    "bg-gradient-to-br from-blue-400 to-blue-600",
    "bg-gradient-to-br from-purple-400 to-purple-600",
    "bg-gradient-to-br from-green-400 to-green-600",
    "bg-gradient-to-br from-red-400 to-red-600",
    "bg-gradient-to-br from-indigo-400 to-indigo-600",
    "bg-gradient-to-br from-teal-400 to-teal-600",
  ];
  return gradients[index % gradients.length];
}

function getProjectIcon(title: string) {
  const iconMap: { [key: string]: React.ReactElement } = {
    ModelChat: <SiNextdotjs className="w-12 h-12" />,
    "Workflow Summarization Engine": <SiPython className="w-12 h-12" />,
    "Document Generation Library": <SiPython className="w-12 h-12" />,
    "Discuss - Modern Discussion Forum": <SiNextdotjs className="w-12 h-12" />,
    "AstroJS Business Website": <SiAstro className="w-12 h-12" />,
    "Code Snippet Manager": <SiPrisma className="w-12 h-12" />,
    "Precision Health Calculator": <SiReact className="w-12 h-12" />,
  };
  return iconMap[title] || <SiTypescript className="w-12 h-12" />;
}

function getProjectDisplay(project: (typeof projects)[0], index: number) {
  return (
    <div
      className={`aspect-video ${getGradientClass(
        index
      )} flex flex-col items-center justify-center gap-4`}
    >
      {getProjectIcon(project.title)}
      <div className="text-white text-lg font-medium opacity-80">
        {project.technologies[0]}
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="pt-40 px-4 bg-background strange-loop">
      <div className="max-w-7xl mx-auto py-16">
        <h1 className="text-6xl font-serif font-bold mb-16 tracking-tighter uppercase italic border-b-8 border-foreground inline-block">
          The Gallery of Impossible Works
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`bg-card ink-sketch overflow-hidden hover:-translate-y-2 transition-all duration-500 group ${
                project.link ? "cursor-pointer" : ""
              }`}
              onClick={() =>
                project.link && (window.location.href = project.link)
              }
            >
              <div className="relative">
                {getProjectDisplay(project, index)}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-4xl font-serif font-bold italic rotate-12">VIEW</span>
                </div>
              </div>
              <div className="p-8 border-t-2 border-foreground">
                <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/80 mb-8 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1 bg-secondary text-secondary-foreground border-2 border-foreground font-bold text-sm uppercase tracking-widest"
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
