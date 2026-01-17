"use client";

import Link from "next/link";

export default function ExperimentsPage() {
  const experiments = [
    {
      title: "Health Calculator",
      description: "A precision health calculator for tracking fitness goals",
      href: "/experiments/health-calculator",
    },
    // Add more experiments here as needed
  ];

  return (
    <main className="flex min-h-screen flex-col items-center pt-40 px-4">
      <h1 className="text-4xl font-bold mb-8">Experiments</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        {experiments.map((experiment) => (
          <Link
            key={experiment.title}
            href={experiment.href}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {experiment.title}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              {experiment.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
