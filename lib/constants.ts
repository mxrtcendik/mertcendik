import type { PersonalInfo, Project, SocialLink } from "./types";

export const personalInfo: PersonalInfo = {
  name: "Mert Cendik",
  title: "Design Engineer",
  about:
    "I'm a Design Engineer crafting fast, reliable, production-ready software. I care deeply about performance, DX, and building things that truly ship.",
  email: "mert@mertcendik.dev",
  baseUrl: "https://mertcendik.dev",
};

export const projects: Project[] = [
  {
    name: "flarelinker",
    description:
      "A minimal, production-ready URL shortener built as a Cloudflare Worker. Open-source and free to use.",
    url: "https://go.mertcendik.dev/flarelinker",
  },
  {
    name: "Lagoonte",
    description:
      "AI-powered monitoring, DDoS protection and more for your website. Currently in active development.",
    url: "https://lagoonte.com/",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://go.mertcendik.dev/github",
  },
  {
    name: "X",
    url: "https://go.mertcendik.dev/twitter",
  },
  {
    name: "LinkedIn",
    url: "https://go.mertcendik.dev/linkedin",
  },
  {
    name: "Instagram",
    url: "https://go.mertcendik.dev/instagram",
  },
];
