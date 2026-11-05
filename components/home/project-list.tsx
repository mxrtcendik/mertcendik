import type { Project } from "@/lib/types";
import { cardSurface, cn } from "@/lib/utils";
import { PostLink } from "@/components/blog/post-link";
import { ProjectTitleTransition } from "@/components/layout/transitions";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubLogoIcon,
  StarIcon,
} from "@phosphor-icons/react/ssr";

const arrowClass =
  "text-muted-foreground size-3.5 -translate-x-0.5 translate-y-0.5 opacity-0 transition-[opacity,translate] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-0 group-hover:opacity-100 group-has-[a[data-card]:focus-visible]:translate-0 group-has-[a[data-card]:focus-visible]:opacity-100 motion-reduce:translate-0";

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
        <div key={index} className="-mx-4 space-y-2 rounded-lg p-4">
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

function Stars({ count }: { count?: number | null }) {
  if (typeof count !== "number" || count < 1) return null;

  return (
    <span className="text-muted-foreground inline-flex items-center gap-1 text-sm tabular-nums">
      <StarIcon className="size-3" weight="fill" />
      {count.toLocaleString("en-US")}
      <span className="sr-only"> stars on GitHub</span>
    </span>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="-mx-4 space-y-3">
      {projects.map((project) => (
        <div
          key={project.name}
          className={cn(
            "group has-[a[data-card]:active]:bg-surface-active relative has-[a[data-card]:active]:scale-[0.99] motion-reduce:has-[a[data-card]:active]:scale-100",
            cardSurface
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <PostLink
              data-card
              href={
                project.page
                  ? `/projects/${project.name}`
                  : (project.site ?? project.url)
              }
              {...(project.page
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="focus-visible:after:ring-ring inline-flex items-center gap-1 text-base font-medium outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2"
            >
              <ProjectTitleTransition name={project.name}>
                <span>{project.name}</span>
              </ProjectTitleTransition>
              {project.page ? (
                <ArrowRightIcon aria-hidden className={arrowClass} />
              ) : (
                <>
                  <ArrowUpRightIcon aria-hidden className={arrowClass} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </>
              )}
            </PostLink>
            <div className="flex items-center gap-3">
              {project.site && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} on GitHub (opens in a new tab)`}
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring relative -m-3 rounded-md p-3 transition-[color,opacity,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none group-hover:opacity-100 group-has-[a[data-card]:focus-visible]:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 active:scale-[0.9] motion-reduce:active:scale-100 [@media(hover:hover)]:opacity-0"
                >
                  <GithubLogoIcon className="size-4" />
                </a>
              )}
              <Stars count={project.stars} />
            </div>
          </div>
          <div className="text-muted-foreground mt-1 text-sm">
            {project.description}
          </div>
        </div>
      ))}
    </div>
  );
}
