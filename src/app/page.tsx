// src/app/page.tsx
import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

// Add an optional id prop to the Section component
const Section = ({ children, id }: { children: React.ReactNode, id?: string }) => (
  <div id={id} className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto p-4 md:p-8">
    {children}
  </div>
);

export default function Home() {
  return (
    <main>
      <Section id="hero-section"><Hero /></Section>
      <Section><Expertise /></Section>
      <Section><Experience /></Section>
      <Section><Projects /></Section>
      <Section><Skills /></Section>
      <Section><Contact /></Section>
    </main>
  );
}