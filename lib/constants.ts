import type { PersonalInfo, Project, SocialLink } from "./types";

export const personalInfo: PersonalInfo = {
  name: "Mert Cendik",
  title: "Design Engineer",
  about:
    "I'm a Design Engineer who likes to build interfaces that feel and look right. I care deeply about performance, DX, and building things that truly ship. I'm also a coffee addict and a music lover.",
  email: "mertcendik@proton.me",
  baseUrl: "https://cendik.dev",
};

export const projects: Project[] = [
  {
    name: "flarelinker",
    description:
      "A minimal, production-ready URL shortener built as a Cloudflare Worker. Open-source and free to use.",
    url: "https://github.com/mxrtcendik/flarelinker",
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
