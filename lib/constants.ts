import type { PersonalInfo, Project, SocialLink } from "./types";

export const personalInfo: PersonalInfo = {
  name: "Mert Cendik",
  title: "Design Engineer",
  about:
    "I build interfaces where motion, latency, and the small details feel right. I care about performance and DX, and I ship small tools that do one thing well. The latest is overlap, a scheduling poll that finds the time everyone can make.",
  email: "mert@cendik.dev",
  baseUrl: "https://cendik.dev",
};

export const projects: Project[] = [
  {
    name: "overlap",
    description: "Find the time everyone can make, in everyone's own timezone.",
    url: "https://github.com/mxrtcendik/overlap",
    site: "https://overlap.cendik.dev",
    page: true,
  },
  {
    name: "onpurpose",
    description:
      "A hold-to-confirm button for React, for actions you don't want to run by accident.",
    url: "https://github.com/mxrtcendik/onpurpose",
    site: "https://onpurpose.cendik.dev",
    page: true,
  },
  {
    name: "hourlink",
    description:
      "Share a meeting time as a link. Whoever opens it sees it in their own timezone.",
    url: "https://github.com/mxrtcendik/hourlink",
    site: "https://hourlink.cendik.dev",
    page: true,
  },
  {
    name: "flarelinker",
    description:
      "A small URL shortener that runs on Cloudflare Workers. Open source and free to use.",
    url: "https://github.com/mxrtcendik/flarelinker",
  },
  {
    name: "mertcendik",
    description: "This site, built with Next.js, TypeScript, and MDX.",
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
