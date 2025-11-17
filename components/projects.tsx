import { projects } from "@/lib/constants";
import Link from "next/link";

export function Projects() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-medium tracking-tight">Projects</h2>
      <div className="space-y-3">
        {projects.map((project) => (
          <Link
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg hover:bg-muted-foreground/10"
          >
            <div className="text-base font-medium">{project.name}</div>
            <div className="text-sm text-muted-foreground mt-0.5">
              {project.description}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
