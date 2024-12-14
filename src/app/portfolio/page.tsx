export default function Portfolio() {
  const projects = [
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
      imageUrl: "/health-calc.jpg", // Add actual image later
    },

    // Add more projects
  ];

  return (
    <div className="pt-16 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-800" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
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
