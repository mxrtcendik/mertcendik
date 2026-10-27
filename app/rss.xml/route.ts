import { getBlogPosts } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";

export async function GET() {
  const posts = getBlogPosts();
  const siteUrl = personalInfo.baseUrl;

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${personalInfo.name}</title>
    <link>${siteUrl}</link>
    <description>${personalInfo.about}</description>
    <language>en-us</language>
    ${posts
      .map((post) => {
        return `
      <item>
        <title>${post.title}</title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <description>${post.title}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <guid>${siteUrl}/blog/${post.slug}</guid>
      </item>
    `;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
