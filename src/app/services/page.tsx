import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "Strategic Systems Architecture",
      description: "De-risk your roadmap before writing a single line of code. I deliver validated technical blueprints that align business velocity with architectural stability, ensuring your system scales without collapsing under its own weight.",
      technologies: ["System Design", "Cloud Architecture", "Product Strategy"],
    },
    {
      title: "Full-Stack Engineering",
      description: "End-to-end delivery, from distributed backend systems to polished React frontends. I own the pipeline and make sure what we build is maintainable, testable, and robust.",
      technologies: ["Next.js", "React", "Node.js", "TypeScript"],
    },
    {
      title: "AI Integration",
      description: "Beyond chatbots. I architect RAG pipelines and agentic workflows that integrate directly into your business processes, creating software that drives real ROI rather than just novelty.",
      technologies: ["LLMs", "LangChain", "Vector DBs", "Agentic Workflows"],
    },
    {
      title: "Security & Performance Audits",
      description: "Hardening systems against scale and malice. Comprehensive audits covering zero-trust security, database throughput, and Core Web Vitals optimization to turn legacy debt into an asset.",
      technologies: ["Penetration Testing", "Optimization", "Code Audit"],
    },
    {
      title: "Prototype to Production",
      description: "Got a working prototype that needs to become a real product? I take early-stage code and refactor it into something maintainable, observable, and scalable.",
      technologies: ["Production Hardening", "AI Code Refinement", "Refactoring", "Scaling"],
    },
  ];

  return (
    <div className="pt-40 px-4 bg-background strange-loop min-h-screen">
      <div className="max-w-6xl mx-auto py-12 relative z-10">
        <div className="mb-20 text-center relative">
          <h1 className="text-7xl font-serif font-black mb-6 tracking-tighter uppercase italic leading-none rough">
            How I Can <br />
            <span className="text-primary italic">Help</span>
          </h1>
          <p className="text-xl font-prose text-foreground max-w-2xl mx-auto">
            I work with teams and founders who need senior engineering muscle &mdash; whether that&apos;s architecture, hands-on delivery, or getting AI to do something actually useful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-paper ink-sketch p-10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-4xl font-serif font-black mb-6 tracking-tighter italic rough">
                  {service.title}
                </h3>
                <p className="text-lg text-foreground mb-8 leading-relaxed font-prose">
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
        <div className="mt-24 text-center bg-foreground text-paper p-16 ink-sketch relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none chess-board" />
          <h2 className="text-5xl font-serif font-bold mb-8 italic uppercase tracking-tighter rough">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl mb-12 text-foreground max-w-2xl mx-auto font-prose">
            Have a project that needs senior engineering help? I&apos;d love to hear about it.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground text-3xl font-serif font-bold italic px-12 py-6 ink-sketch hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-tighter rough"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
