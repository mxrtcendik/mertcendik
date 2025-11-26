import { personalInfo } from "@/lib/constants";

export function About() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-medium tracking-tight">About me</h2>
      <p className="text-base text-muted-foreground">{personalInfo.about}</p>
    </section>
  );
}
