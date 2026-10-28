const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const dir = path.join(process.cwd(), "content", "blog");
const posts = {};

for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith(".mdx") && !name.endsWith(".md")) continue;

  const slug = name.replace(/\.(mdx|md)$/, "");
  const { data } = matter(fs.readFileSync(path.join(dir, name), "utf8"));

  posts[slug] = {
    title: typeof data.title === "string" ? data.title : slug,
    date: data.date ? new Date(data.date).toISOString() : "",
  };
}

const source = `export const ogPosts: Record<string, { title: string; date: string }> = ${JSON.stringify(posts, null, 2)};\n`;

fs.writeFileSync(path.join(process.cwd(), "lib", "og-posts.ts"), source);
