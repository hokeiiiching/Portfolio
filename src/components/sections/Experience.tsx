import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const workExperience = {
  company: "Guidesify",
  role: "Software Engineer and Business Development Intern",
  period: "Feb 2025 – June 2025",
  description: [
    "Spearheaded UI/UX redesign for a sales funnel web app, directly increasing sales conversion rates.",
    "Developed a sophisticated image classification tool using SvelteKit and OpenCV, reducing manual processing time by an estimated 80%.",
    "Integrated GenAI capabilities into an SEO writer by leveraging DeepInfra to enhance content engagement.",
    "Thrived in an Agile environment, participating in daily sprints and iterative feedback cycles.",
  ],
  stack: ["SvelteKit", "OpenCV", "PostgreSQL", "TailwindCSS", "Typescript", "REST APIs", "Cloudflare Workers"],
};

export const Experience = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold tracking-tight">Work Experience</h3>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
                <CardTitle>{workExperience.role}</CardTitle>
                <CardDescription>{workExperience.company}</CardDescription>
            </div>
            <p className="text-sm text-muted-foreground whitespace-nowrap">{workExperience.period}</p>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            {workExperience.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          {workExperience.stack.map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </CardFooter>
      </Card>
    </section>
  );
};