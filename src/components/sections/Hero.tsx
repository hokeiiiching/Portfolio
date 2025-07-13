// src/components/sections/Hero.tsx
import { Mail, Linkedin, Github, MapPin, School, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1
        className="text-4xl md:text-5xl font-bold tracking-tighter glitch-wrapper"
        data-text="Ho Kei Ching"
      >
        <span>Ho Kei Ching</span>
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest font-orbitron">
        AI & ML Enthusiast & Aspiring Software Engineer
      </h2>
      
      <p className="max-w-2xl text-muted-foreground">
        A background in Computer Science and Business Administration. Passionate about building modern web applications and exploring the potential of AI/ML.
      </p>

      <p className="max-w-3xl text-muted-foreground leading-relaxed">
        My journey into tech began during my free time in National Service, where I taught myself to code and brought my own projects to life. This passion and initiative led to an internship at Guidesify and fueled my drive to build modern, impactful web applications with a focus on clean architecture.
      </p>

      {/* New section for structured information */}
      <div className="flex flex-col md:flex-row gap-x-8 gap-y-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Based in Singapore</span>
        </div>
        <div className="flex items-center gap-2">
          <School className="h-5 w-5 text-primary" />
          <span>Year 1, NUS Computer Science & Business</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <a href="mailto:hokeiching.work@gmail.com" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </a>
        <a href="https://www.linkedin.com/in/ho-k-83162a298/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
          </Button>
        </a>
        <a href="https://github.com/hokeiiiching" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon">
            <Github className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </section>
  );
};