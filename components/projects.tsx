import { ProjectList } from "@/components/project-list";
import { projects } from "@/lib/constants";

export function Projects() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-medium tracking-tight">Projects</h2>
      <ProjectList projects={projects} />
    </section>
  );
}
