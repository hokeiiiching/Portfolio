import { Badge } from "@/components/ui/badge";

const skills = {
  "Languages": ["TypeScript", "JavaScript", "Python", "C++", "SQL", "HTML/CSS"],
  "Frameworks & Libraries": ["Svelte 5", "SvelteKit", "React Native", "TailwindCSS", "OpenCV"],
  "Cloud & Backend": ["Supabase", "PostgreSQL", "Cloudflare Workers", "AWS IoT", "REST APIs", "Docker"],
  "GenAI": ["DeepInfra", "LLM Selection", "Prompt Engineering"],
};

export const Skills = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold tracking-tight">Technical Skills</h3>
      <div className="flex flex-col gap-6">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="flex flex-col gap-2">
            <h4 className="font-medium">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item} variant="secondary">{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};