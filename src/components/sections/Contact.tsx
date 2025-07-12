// src/components/sections/Contact.tsx

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react"; 

export const Contact = () => {
  return (
    <section className="flex flex-col items-center text-center gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold tracking-tight">Get In Touch</h3>
        <p className="text-muted-foreground max-w-lg">
          I am always open to connecting and discussing about business opportunities. Feel free to send me a message or connect!
        </p>
      </div>
      
      <a 
        href="mailto:hokeiching.work@gmail.com"
        className="group relative inline-block rounded-lg border border-primary/50 px-6 py-3 text-lg font-bold text-primary transition-all duration-300 hover:bg-primary/10"
      >
        <span className="text-glow">hokeiching.work@gmail.com</span>
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary opacity-50 transition-all duration-300 group-hover:w-0 group-hover:opacity-0"></span>
        <span className="absolute right-0 top-0 h-0.5 w-full bg-primary opacity-50 transition-all duration-300 group-hover:w-0 group-hover:opacity-0"></span>
      </a>

      {/* ---  Back to Top Button --- */}
      <div className="pt-12">
        <a href="#hero-section">
          <Button variant="outline">
            <ArrowUp className="mr-2 h-4 w-4" />
            Back To Top
          </Button>
        </a>
      </div>
    </section>
  );
};