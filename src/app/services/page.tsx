import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "The Architecture of Thought",
      subtitle: "Strategy & Digital Blueprinting",
      description: "Before a single line is etched, there is the logic of the system. I help founders navigate the impossible staircases of product strategy, cloud architecture, and technical feasibility.",
      marginalia: "Note: Recursion is the soul of scalability.",
      symbol: "Σ",
      technologies: ["System Design", "Cloud Architecture", "Product Strategy"],
    },
    {
      title: "The Masterpiece Artifact",
      subtitle: "Full-Stack Craftsmanship",
      description: "Turning blueprints into reality with woodcut precision. From the looking glass of the frontend to the recursive depth of the backend, I build digital artifacts that don't just work—they resonate.",
      marginalia: "Must feel tactile, like ink on parchment.",
      symbol: "λ",
      technologies: ["Next.js", "React", "Node.js", "TypeScript"],
    },
    {
      title: "The Neural Strange Loop",
      subtitle: "AI & Neural Logic Integration",
      description: "Weaving intelligence into the loop. I specialize in integrating Large Language Models and custom neural logic to create software that learns, evolves, and eventually, understands.",
      marginalia: "Q: Can the machine mirror the maker?",
      symbol: "Δ",
      technologies: ["LLMs", "LangChain", "Vector DBs", "Neural Logic"],
    },
    {
      title: "The Alchemist's Audit",
      subtitle: "Performance & Security Refinement",
      description: "Refining the base metal of legacy code into the gold of high-performance systems. Audits for safety, speed, and structural integrity in an age of automated precision.",
      marginalia: "Security is the ultimate strange loop.",
      symbol: "∞",
      technologies: ["Penetration Testing", "Optimization", "Code Audit"],
    },
    {
      title: "The Vibe Transmutation",
      subtitle: "Prototype to Production Sovereignty",
      description: "Taking the 'vibe-coded' artifacts of early experimentation and hardening them for the real world. I move AI-assisted prototypes beyond the dream of creation into stable, sovereign production environments.",
      marginalia: "Vibes are the dream; code is the waking reality.",
      symbol: "Φ",
      technologies: ["Production Hardening", "AI Code Refinement", "Refactoring", "Scaling"],
    },
  ];

  return (
    <div className="pt-40 px-4 bg-background strange-loop min-h-screen">
      <div className="max-w-6xl mx-auto py-12 relative z-10">
        <div className="mb-20 text-center relative">
          <h1 className="text-7xl font-serif font-black mb-6 tracking-tighter uppercase italic leading-none">
            The Laboratory <br />
            <span className="text-primary italic">of Logic</span>
          </h1>
          <p className="text-xl font-sans text-foreground max-w-2xl mx-auto">
            "Everything is a strange loop. My services are the tools I use to navigate the paradoxes of digital creation."
          </p>
          <div className="absolute -top-10 -left-10 text-9xl font-serif opacity-5 select-none pointer-events-none">
            &alpha;
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-card ink-sketch p-10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Marginalia Annotation */}
              <div className="absolute top-4 right-4 text-sm font-serif italic text-primary opacity-60 group-hover:opacity-100 transition-opacity max-w-[120px] text-right pointer-events-none">
                {service.marginalia}
              </div>

              {/* Background Symbol */}
              <div className="absolute bottom-[-20px] right-[-20px] text-[180px] font-serif text-foreground/5 select-none group-hover:text-primary/10 transition-colors pointer-events-none leading-none">
                {service.symbol}
              </div>

              <div className="relative z-10">
                <div className="text-primary font-serif italic font-bold mb-2 tracking-widest uppercase text-sm">
                  {service.subtitle}
                </div>
                <h3 className="text-4xl font-serif font-black mb-6 tracking-tighter italic">
                  {service.title}
                </h3>
                <p className="text-lg text-foreground mb-8 leading-relaxed font-sans">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1 border border-primary/30 font-serif italic text-sm hover:border-primary transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-24 text-center bg-foreground text-background p-16 ink-sketch relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none chess-board" />
          <h2 className="text-5xl font-serif font-bold mb-8 italic uppercase tracking-tighter">
            Begin the Experiment
          </h2>
          <p className="text-xl mb-12 text-foreground max-w-2xl mx-auto font-sans">
            Ready to collaborate on a digital artifact that defies expectation? Let&apos;s enter the blueprint together.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground text-3xl font-serif font-bold italic px-12 py-6 ink-sketch hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-tighter"
          >
            Dispatch a Raven
          </Link>
        </div>
      </div>
    </div>
  );
}
