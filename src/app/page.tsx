"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
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
      name: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    { name: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis"] },
    { name: "Cloud & DevOps", items: ["AWS", "Docker", "CI/CD", "Terraform"] },
    {
      name: "AI & ML",
      items: ["OpenAI", "LangChain", "TensorFlow", "PyTorch"],
    },
  ];

  const highlights = [
    {
      title: "10+ Years Experience",
      description:
        "Building scalable web applications and leading development teams",
    },
    {
      title: "Full-Stack Developer",
      description: "End-to-end solutions from frontend to backend architecture",
    },
    {
      title: "Team Leadership",
      description:
        "Mentoring developers and driving technical excellence across distributed teams",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hi, I&apos;m Zac.
                <span className="text-blue-600 dark:text-blue-400">
                  {" "}
                  I build intelligent web solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Full-stack developer passionate about creating intelligent
                applications that solve real problems
              </p>
              <div className="flex gap-4">
                <a
                  href="/contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start a Project
                </a>
                <a
                  href="/portfolio"
                  className="bg-gray-200 dark:bg-gray-700 px-8 py-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  View Work
                </a>
                {showBlogLink && (
                  <Link
                    href="/blog"
                    className="bg-gray-200 dark:bg-gray-700 px-8 py-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Read Blog
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden lg:block relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/profile.jpg"
                  alt="Zac Zadell - Full-Stack Developer & AI Engineer"
                  width={500}
                  height={500}
                  className="rounded-full shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="p-6 rounded-xl border dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Technical Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((category) => (
              <div
                key={category.name}
                className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Let&apos;s collaborate to bring your vision to life with
            cutting-edge technology.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
