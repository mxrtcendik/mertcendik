import { ProjectList } from "@/components/project-list";
import { projects } from "@/lib/constants";
import { getGithubStars } from "@/lib/github";

export async function Projects() {
  const projectsWithStars = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      stars: await getGithubStars(project.url),
    })),
  );

  return (
    <section id="projects" className="scroll-mt-8 space-y-4">
      <h2 className="text-muted-foreground text-sm font-medium tracking-tight">
        Projects
      </h2>
      <ProjectList projects={projectsWithStars} />
    </section>
  );
}
