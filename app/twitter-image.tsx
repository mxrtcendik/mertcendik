import { personalInfo } from "@/lib/constants";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${personalInfo.name}, ${personalInfo.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  // The first sentence of the About text, so the card says what the site is.
  return renderOgImage({
    title: personalInfo.about.split(". ")[0] + ".",
  });
}
