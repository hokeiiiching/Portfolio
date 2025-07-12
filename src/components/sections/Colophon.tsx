// src/components/sections/Colophon.tsx

import { Code, Wind, Cog, Binary, Cloud, PenTool } from 'lucide-react';

const techStack = [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    name: 'Next.js & React',
    description: 'For its powerful hybrid framework capabilities, enabling a fast, statically-generated site with the flexibility of server-side rendering when needed.',
  },
  {
    icon: <Binary className="h-6 w-6 text-primary" />,
    name: 'TypeScript',
    description: 'To ensure type safety and improve the developer experience, making the codebase more robust and scalable.',
  },
  {
    icon: <Wind className="h-6 w-6 text-primary" />,
    name: 'Tailwind CSS',
    description: 'For a utility-first CSS approach that allows for rapid and custom UI development directly within the markup.',
  },
  {
    icon: <Cog className="h-6 w-6 text-primary" />,
    name: 'Shadcn/UI',
    description: 'Used for its unstyled, accessible, and composable components that can be easily adapted to a custom theme.',
  },
  {
    icon: <PenTool className="h-6 w-6 text-primary" />,
    name: 'Framer Motion',
    description: 'To add fluid animations and micro-interactions, enhancing the user experience and bringing the design to life.',
  },
  {
    icon: <Cloud className="h-6 w-6 text-primary" />,
    name: 'Vercel',
    description: 'For seamless, continuous deployment and hosting, perfectly integrated with the Next.js framework.',
  },
];

export const Colophon = () => {
  return (
    <section className="flex flex-col gap-8">
      <p className="max-w-3xl text-muted-foreground leading-relaxed">
        This portfolio is built from scratch as a personal project to dive deeper into the React ecosystem. It is designed in Figma and developed with a modern, performant tech stack.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="flex items-start gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary/50 bg-secondary/30"
          >
            {tech.icon}
            <div className="flex flex-col">
              <h4 className="font-bold">{tech.name}</h4>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};