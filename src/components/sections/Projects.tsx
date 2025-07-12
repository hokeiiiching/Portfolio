import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Hacknosis: Sustainable MedTech",
    description: "Engineered an AWS IoT-powered system with an Isolated Forest model to detect temperature anomalies in refrigerated containers.",
    tags: ["AWS IoT", "Python", "Scikit-learn", "Data Science"],
  },
  {
    title: "NUS's HealthHack Hackathon",
    description: "Developed a React Native mobile app that tracks medication adherence to improve patient outcomes.",
    tags: ["React Native", "TypeScript", "Mobile App"],
  },
  {
    title: "Full-Stack Quantitative Trading Bot",
    description: "Built a trading bot using Markov Chains to analyze historical price trends and predict short-term market movements.",
    tags: ["Python", "Markov Chains", "Full-Stack", "Finance"],
    href: "https://markovbot.vercel.app/", // <-- The link for the card
  },
];

export const Projects = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold tracking-tight">Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => {
          const CardComponent = (
            <Card className="flex flex-col h-full transition-all group hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 cyber-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{project.title}</CardTitle>
                  {project.href && (
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow gap-4">
                <CardDescription>{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );

          // If the project has an href, wrap the card in a link tag
          if (project.href) {
            return (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
              >
                {CardComponent}
              </a>
            );
          }

          return <div key={project.title}>{CardComponent}</div>;
        })}
      </div>
    </section>
  );
};