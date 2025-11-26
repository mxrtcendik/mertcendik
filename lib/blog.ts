import { calculateReadingTime } from "@/lib/utils";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import type { BlogPost } from "./types";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString() : "",
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));

  return posts;
}

export function getBlogPost(slug: string): BlogPost | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);

  let fullPath: string;
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString() : "",
    content,
    readingTime: calculateReadingTime(content),
  };
}
