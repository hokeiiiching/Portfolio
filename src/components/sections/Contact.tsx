import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section className="flex flex-col items-center text-center gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold tracking-tight">Get In Touch</h3>
        <p className="text-muted-foreground max-w-lg">
          I'm always open to new business opportunities and am always open to connecting with new people. Feel free to reach out!
        </p>
      </div>
      <a href="mailto:hokeiching.work@gmail.com">
        <Button size="lg">Say Hello</Button>
      </a>
    </section>
  );
};