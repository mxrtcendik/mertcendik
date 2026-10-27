import { calculateReadingTime } from "@/lib/utils";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import type { BlogPost } from "./types";

const postsDirectory = path.join(
  /*turbopackIgnore: true*/ process.cwd(),
  "content",
  "blog"
);

function getPostDescription(content: string, description?: unknown) {
  if (typeof description === "string" && description.trim()) {
    return description.trim();
  }

  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#>*_~`[\]()!-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, "");
      const fullPath = path.join(
        /*turbopackIgnore: true*/ postsDirectory,
        fileName
      );
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString() : "",
        description: getPostDescription(content, data.description),
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));

  return posts;
}

export function getBlogPost(slug: string): BlogPost | null {
  const mdxPath = path.join(
    /*turbopackIgnore: true*/ postsDirectory,
    `${slug}.mdx`
  );
  const mdPath = path.join(
    /*turbopackIgnore: true*/ postsDirectory,
    `${slug}.md`
  );

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
    description: getPostDescription(content, data.description),
    content,
    readingTime: calculateReadingTime(content),
  };
}
