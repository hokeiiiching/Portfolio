import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
        Ho Kei Ching
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-muted-foreground">
        AI/ML Enthusiast & Software Engineer
      </h2>
      <p className="max-w-2xl text-muted-foreground">
        Aspiring Software Engineer with a background in Computer Science and Business Administration. Passionate about building modern web applications and exploring the potential of AI/ML.
      </p>
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
        <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon">
            <Github className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </section>
  );
};