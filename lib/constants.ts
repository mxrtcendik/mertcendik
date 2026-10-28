import type { PersonalInfo, Project, SocialLink } from "./types";

export const personalInfo: PersonalInfo = {
  name: "Mert Cendik",
  title: "Design Engineer",
  about:
    "I build interfaces where motion, latency, and the small details feel right. I care about performance and DX, and I like shipping small finished things, like flarelinker, a URL shortener on Cloudflare.",
  email: "mert@cendik.dev",
  baseUrl: "https://cendik.dev",
};

export const projects: Project[] = [
  {
    name: "hourlink",
    description:
      "A meeting time, as a link. No account. Whoever opens it sees that moment in their own timezone.",
    url: "https://github.com/mxrtcendik/hourlink",
  },
  {
    name: "flarelinker",
    description:
      "A minimal, production-ready URL shortener built as a Cloudflare Worker. Open-source and free to use.",
    url: "https://github.com/mxrtcendik/flarelinker",
  },
  {
    name: "mertcendik",
    description: "This website. Built with Next.js, TypeScript, and MDX.",
    url: "https://github.com/mxrtcendik/mertcendik",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/mxrtcendik",
  },
  {
    name: "X",
    url: "https://x.com/mrtcendik",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/mertcendik",
  },
];
