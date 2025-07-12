// src/components/sections/Expertise.tsx

import { Code, CloudCog, Palette } from 'lucide-react';

const expertiseAreas = [
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: "Frontend Development",
    underlineColor: "bg-cyan-400",
    description: "Passionate about UI/UX. Experienced in TypeScript, Svelte, React, and modern CSS frameworks like TailwindCSS.",
  },
  {
    icon: <CloudCog className="w-8 h-8 text-primary" />,
    title: "Cloud & GenAI",
    underlineColor: "bg-fuchsia-500",
    description: "Skilled in building scalable backend solutions with Supabase, PostgreSQL, and deploying with Docker, Cloudflare, and AWS.",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Software Engineering",
    underlineColor: "bg-lime-400",
    description: "With the rise in GenAI, I focus on LLM selection and prompt engineering to create efficient AI-driven applications. Also, I place a heavy emphasis on clean code architecture and design patterns - something that AI still struggles with today!",
  },
];

export const Expertise = () => {
  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-2xl font-semibold tracking-tight">My Expertise</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expertiseAreas.map((area) => (
          <div key={area.title} className="flex flex-col gap-4 p-6 border border-border rounded-lg bg-secondary/30">
            <div className="icon-box-icon">{area.icon}</div>
            <h4 className="text-xl font-bold relative inline-block">
              {area.title}
              <span 
                className={`absolute bottom-[-4px] left-0 h-1 w-3/4 ${area.underlineColor} transition-all duration-300`}
              />
            </h4>
            <p className="text-muted-foreground">{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};