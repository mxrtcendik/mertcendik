import { personalInfo } from "@/lib/constants";

export function Header() {
  return (
    <section className="pt-12">
      <div>
        <h1 className="text-lg font-medium tracking-tight">
          {personalInfo.name}
        </h1>
        <p className="text-base text-muted-foreground font-medium">
          {personalInfo.title}
        </p>
      </div>
    </section>
  );
}
