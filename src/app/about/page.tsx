"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  return (
    <div className="pt-40 px-4 bg-background strange-loop min-h-screen">
      <div className="max-w-4xl mx-auto py-12 relative z-10">
        <h1 className="text-7xl font-serif font-black mb-16 tracking-tighter uppercase italic leading-none border-b-8 border-foreground pb-4">
          The <span className="text-primary italic">Architect</span>
        </h1>

        {/* Bio Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div className="md:col-span-2 space-y-8 text-lg leading-relaxed font-prose">
            <p>
              Hello! I&apos;m{" "}
              <span className="font-serif font-bold italic text-primary text-xl">
                Zac Zadell
              </span>
              , a software engineer and digital solutions consultant based in
              Portland, Oregon. My journey in technology began when I wrote my first lines of code at
              age 8, eventually leading me to over two decades of building systems for giants like Nike, Facebook, and Unity.
            </p>
            <p>
              Currently, as the founder of <strong>Zadell Consulting</strong>, I help businesses
              leverage modern web architectures and AI to create impactful digital
              solutions that don&apos;t just work—they resonate.
            </p>
          </div>
          <div className="bg-card ink-sketch p-8 space-y-4 h-fit">
            <h3 className="text-2xl font-serif font-bold italic uppercase border-b-2 border-primary pb-2">
              The Arsenal
            </h3>
            <ul className="space-y-2 font-serif italic text-lg opacity-80">
              <li>&lambda; Next.js & React</li>
              <li>&lambda; AI & Neural Logic</li>
              <li>&lambda; Cloud Architecture</li>
              <li>&lambda; Process Automation</li>
              <li>&lambda; Digital Strategy</li>
            </ul>
          </div>
        </div>

        {/* Branding Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-12 bg-card ink-sketch p-12">
          <div className="relative w-64 h-64 flex-shrink-0 ink-sketch p-2 bg-card overflow-hidden">
            <Image
              src={theme === "dark" ? "/images/logo_zz_escher_dark.jpg" : "/images/logo_zz_escher.jpg"}
              alt="ZZ Escher Logo"
              fill
              className="object-cover object-center scale-125 hover:scale-135 transition-all duration-700"
            />
          </div>
          <div>
            <h2 className="text-5xl font-serif font-black mb-6 tracking-tighter uppercase italic leading-none">
              About the <br />
              <span className="text-primary italic">Strange Loop</span>
            </h2>
            <p className="text-xl font-prose text-foreground max-w-2xl">
              "I wonder if I've been changed in the night? Let me think: was I the same when I got up this morning?"
            </p>
          </div>
        </div>

        {/* Philosophy Section */}
        <section className="mb-24 bg-foreground text-background p-12 ink-sketch relative overflow-hidden">
          <div className="absolute top-4 right-4 text-9xl font-serif opacity-10 select-none">
            &phi;
          </div>
          <h2 className="text-4xl font-serif font-bold mb-8 uppercase tracking-widest italic border-b-2 border-background/20 pb-4">
            The Creative Philosophy
          </h2>
          <div className="space-y-6 text-lg leading-relaxed font-prose text-background">
            <p>
              In an age of AI-driven precision and the silent approach of AGI, I believe we crave the <strong>tactile imperfection</strong> of the human touch. This digital space is a deliberate return to the "analog" soul of computing—a fusion of rigorous code and the woodcut whimsy of a simpler era.
            </p>
            <p>
              The theme draws from two pillars of paradoxical thought: Lewis Carroll&apos;s <em>Alice in Wonderland</em> and Douglas Hofstadter&apos;s <em>Gödel, Escher, Bach</em>. I see GEB not just as a book on logic, but as a mirror for our modern age—a reminder that intelligence is a beautiful, recursive, and ultimately <em>human</em> strange loop.
            </p>
            <p>
              While I build with the most advanced tools of our time, I believe the future belongs to those who can weave the efficiency of the machine with the unmistakable "ink-smudge" of human creativity.
            </p>
          </div>
        </section>

        {/* Footer Link */}
        <div className="text-center pt-8 border-t-4 border-foreground">
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground text-3xl font-serif font-bold italic px-12 py-6 ink-sketch hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-tighter"
          >
            Dispatch a Message
          </Link>
          <div className="mt-8 flex justify-center gap-8 text-xl font-serif italic">
            <a href="https://github.com/zacharyz" className="hover:text-primary underline">GitHub</a>
            <a href="https://linkedin.com/in/zacharyz" className="hover:text-primary underline">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
