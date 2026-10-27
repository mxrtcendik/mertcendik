import { personalInfo } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="scroll-mt-8 space-y-4">
      <h2 className="text-muted-foreground text-sm font-medium tracking-tight">
        About
      </h2>
      <p className="text-base leading-relaxed">{personalInfo.about}</p>
    </section>
  );
}
