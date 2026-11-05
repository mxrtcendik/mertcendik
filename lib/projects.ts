import { projects } from "@/lib/constants";
import type { Project } from "@/lib/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// A project gets its own page when content/projects/<name>.mdx exists. The
// name, description, and links come from lib/constants.ts, so the page and
// the project card can't disagree.
const projectsDirectory = path.join(
  /*turbopackIgnore: true*/ process.cwd(),
  "content",
  "projects"
);

export type ProjectPage = Project & {
  content: string;
  // The post that goes deeper on this project, if there is one.
  post?: string;
};

export function getProjectPage(name: string): ProjectPage | null {
  const project = projects.find((item) => item.name === name);
  if (!project) return null;

  const file = path.join(
    /*turbopackIgnore: true*/ projectsDirectory,
    `${name}.mdx`
  );
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));

  return {
    ...project,
    content,
    post: typeof data.post === "string" ? data.post : undefined,
  };
}

export function getProjectPageNames(): string[] {
  return projects
    .filter((project) => project.page)
    .map((project) => project.name);
}
