export default function Services() {
  const services = [
    {
      title: "Frontend Development",
      description: "Modern web applications with React and Next.js",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "API Development",
      description: "Scalable and secure backend solutions",
      technologies: ["Node.js", "Python", "REST", "GraphQL"],
    },
    {
      title: "AI Integration",
      description: "Integrating AI/ML capabilities into applications",
      technologies: ["OpenAI", "LangChain", "Vector Databases"],
    },
  ];

  return (
    <div className="pt-40 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-lg border dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
