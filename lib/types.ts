export interface PersonalInfo {
  name: string;
  title: string;
  about: string;
  email: string;
  baseUrl: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  readingTime: string;
}
