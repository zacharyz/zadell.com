"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  return (
    <div className="pt-40 px-4 bg-background strange-loop min-h-screen">
      <div className="max-w-4xl mx-auto py-12 relative z-10">
        <h1 className="text-7xl font-serif font-black mb-16 tracking-tighter uppercase italic leading-none border-b-8 border-foreground pb-4 rough">
          About <span className="text-primary italic">Me</span>
        </h1>

        {/* Bio Section */}
        <div className="space-y-8 text-lg leading-relaxed font-prose bg-paper p-8 ink-sketch mb-24">
          <p>
            I&apos;m{" "}
            <span className="font-serif font-bold italic text-primary text-xl">
              Zac Zadell
            </span>
            , a software engineer and consultant based in Portland, Oregon. I&apos;ve been
            writing code since I was 8, and I&apos;ve spent the last 20+ years building systems
            for companies like Nike, Facebook, and Unity.
          </p>
          <p>
            Right now I&apos;m splitting my time between two things: building{" "}
            <a href="https://threshold.fit" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80 font-semibold">threshold.fit</a>
            , a fitness platform I&apos;m creating from scratch, and running{" "}
            <strong>Zadell Consulting</strong>, where I help teams with architecture,
            AI integration, and full-stack delivery.
          </p>
          <p>
            I care about building things that work well and last. I like hard problems,
            clean abstractions, and shipping code that matters. When I&apos;m not at the keyboard,
            I&apos;m probably running, reading, or thinking about the intersection of technology
            and human experience.
          </p>
          <div className="pt-4 flex flex-wrap gap-3">
            {["Next.js & React", "AI & LLMs", "Cloud Architecture", "Process Automation", "Digital Strategy"].map((skill) => (
              <span key={skill} className="px-4 py-1 border border-primary/30 font-serif italic text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Branding Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-12 bg-paper ink-sketch p-12">
          <div className="relative w-64 h-64 flex-shrink-0 ink-sketch p-2 bg-paper overflow-hidden">
            <Image
              src={theme === "dark" ? "/images/logo_zz_escher_dark.jpg" : "/images/logo_zz_escher.jpg"}
              alt="ZZ Escher Logo"
              fill
              className="object-cover object-center scale-125 hover:scale-135 transition-all duration-700"
            />
          </div>
          <div>
            <h2 className="text-5xl font-serif font-black mb-6 tracking-tighter uppercase italic leading-none rough">
              Why This Site <br />
              <span className="text-primary italic">Looks Like This</span>
            </h2>
            <p className="text-lg font-prose text-foreground max-w-2xl">
              The ink-sketch aesthetic is a nod to two books that shaped how I think:
              Lewis Carroll&apos;s <em>Alice in Wonderland</em> and Douglas Hofstadter&apos;s{" "}
              <em>G&ouml;del, Escher, Bach</em>. In an era of AI-generated everything,
              I wanted something that felt handmade &mdash; a reminder that the best software
              still has a human fingerprint on it.
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-8 border-t-4 border-foreground">
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground text-3xl font-serif font-bold italic px-12 py-6 ink-sketch hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-tighter rough"
          >
            Get in Touch
          </Link>
          <div className="mt-8 flex justify-center gap-8 text-xl font-serif italic">
            <a href="https://github.com/zacharyz" className="hover:text-primary underline">GitHub</a>
            <a href="https://linkedin.com/in/zacharyz" className="hover:text-primary underline">LinkedIn</a>
            <a href="https://threshold.fit" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">threshold.fit</a>
          </div>
        </div>
      </div>
    </div>
  );
}
