// src/app/page.tsx

import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Colophon } from "@/components/sections/Colophon";
import { Contact } from "@/components/sections/Contact";
import { CyberHR } from "@/components/ui/CyberHR"; 
import { Spotlight } from "@/components/ui/spotlight";

const Section = ({ children, id }: { children: React.ReactNode, id?: string }) => (
  <div id={id} className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto p-4 md:p-8">
    {children}
  </div>
);

export default function Home() {
  return (
    <main>
      <Spotlight
        className="-top-20 -left-10 md:-left-32 md:-top-20"
        fill="cyan"
      />
      <Section id="hero-section"><Hero /></Section>
      <CyberHR />
      <Section><Expertise /></Section>
      <CyberHR />
      <Section><Experience /></Section>
      <CyberHR />
      <Section><Projects /></Section>
      <CyberHR />
      <Section><Skills /></Section>
      <CyberHR />
      <Section><Colophon /></Section> {/* <-- 2. Add the new section here */}
      <CyberHR />
      <Section><Contact /></Section>
    </main>
  );
}