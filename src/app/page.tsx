import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="px-4 md:px-16 lg:px-32">
      <div className="mx-auto max-w-4xl space-y-32 py-24">
        <Hero />
        <Expertise />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}