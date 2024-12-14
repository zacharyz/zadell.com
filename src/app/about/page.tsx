import Link from "next/link";

export default function About() {
  return (
    <div className="pt-16 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-6">
            Hello! I&apos;m{" "}
            <span className="font-bold text-lg inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Zac
            </span>
            , a software engineer and digital solutions consultant based in
            Portland, Oregon, where I live with my daughter and two cats. My
            journey in technology began when I wrote my first lines of code at
            age 8, sparking a lifelong passion for software development that
            eventually led me to earn my degree in Computer Science.
          </p>

          <p className="mb-6">
            With over 18 years of experience in the tech industry, I&apos;ve had
            the privilege of working with innovative companies ranging from
            startups to industry giants like Facebook, Nike, and Unity
            Technologies. Since 2005, I&apos;ve been deeply involved in the
            startup ecosystem, contributing to the growth and success of
            companies like GarageGames, AppFog, and ZenBusiness.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What I Do</h2>
          <p className="mb-4">
            Currently, as the founder of Zadell Consulting, I help businesses
            leverage modern web technologies and AI to create impactful digital
            solutions. I specialize in:
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li>Full-stack development using Next.js, React, and TypeScript</li>
            <li>AI integration and custom solutions</li>
            <li>Business process automation</li>
            <li>High-performance web applications</li>
            <li>Data-driven development</li>
            <li>Sales funnel optimization</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">My Approach</h2>
          <p className="mb-6">
            I believe in building technology that not only works well but also
            creates meaningful value for users and businesses alike. My
            experience across different domains—from game development to
            fintech—has taught me the importance of combining technical
            excellence with practical business solutions.
          </p>

          <p className="mb-6">
            When I&apos;m not coding or consulting, you might find me exploring
            Portland&apos;s food scene, spending time with my daughter and cats,
            or staying current with the latest developments in tech.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Let&apos;s Connect
          </h2>
          <p className="mb-6">
            I&apos;m always interested in connecting with fellow tech
            enthusiasts and businesses looking to innovate. Whether you want to
            discuss a potential project or just chat about technology, feel free
            to reach out.
          </p>

          <p className="mb-6">
            <Link
              href="/contact"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Get in touch
            </Link>{" "}
            or find me on{" "}
            <a
              href="https://github.com/zacharyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              GitHub
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/in/zacharyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
