import type { Project } from "@/lib/types";
import { StarIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

export function ProjectSkeleton() {
  return (
    <section
      className="space-y-4"
      aria-busy="true"
      aria-label="Loading projects"
    >
      <h2 className="text-muted-foreground text-sm font-medium tracking-tight">
        Projects
      </h2>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="space-y-2 rounded-lg p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="bg-foreground/10 h-5 w-28 animate-pulse rounded-md" />
            <div className="bg-foreground/10 h-4 w-8 animate-pulse rounded-md" />
          </div>
          <div className="bg-foreground/10 h-4 w-full animate-pulse rounded-md" />
          <div className="bg-foreground/10 h-4 w-4/5 animate-pulse rounded-md" />
        </div>
      ))}
    </section>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <Link
          key={project.name}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-muted-foreground/10 block rounded-lg p-4 transition-[background-color] duration-150"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div className="text-base font-medium">{project.name}</div>
            {typeof project.stars === "number" && (
              <div className="text-muted-foreground inline-flex items-center gap-1 text-sm tabular-nums">
                <StarIcon className="size-3.5" weight="fill" />
                {project.stars.toLocaleString("en-US")}
              </div>
            )}
          </div>
          <div className="text-muted-foreground mt-0.5 text-sm">
            {project.description}
          </div>
          <span className="sr-only"> (opens in a new tab)</span>
        </Link>
      ))}
    </div>
  );
}
