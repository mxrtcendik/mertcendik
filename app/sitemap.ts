import { getBlogPosts } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import { getProjectPageNames } from "@/lib/projects";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getBlogPosts().map((post) => ({
    url: `${personalInfo.baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${personalInfo.baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const projects = getProjectPageNames().map((name) => ({
    url: `${personalInfo.baseUrl}/projects/${name}`,
  }));

  return [...routes, ...blogs, ...projects];
}
