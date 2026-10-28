import { personalInfo } from "@/lib/constants";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${personalInfo.name}, ${personalInfo.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: personalInfo.name,
    detail: personalInfo.title,
  });
}
