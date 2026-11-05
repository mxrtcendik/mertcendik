import { personalInfo, projects } from "@/lib/constants";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = personalInfo.name;

export default async function Image({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const project = projects.find((item) => item.name === name);

  return renderOgImage({
    title: project?.name ?? personalInfo.name,
    description: project?.description,
    meta: project?.site ? new URL(project.site).host : "Project",
  });
}
