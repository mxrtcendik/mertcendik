import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";

export function Blog() {
  const posts = getBlogPosts();

  if (posts.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-medium tracking-tight">Blog</h2>
        <p className="text-muted-foreground">Coming soon.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-medium tracking-tight">Blog</h2>
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 rounded-lg hover:bg-muted-foreground/10"
          >
            <div className="text-base font-medium">{post.title}</div>
            {post.date && (
              <div className="text-sm text-muted-foreground mt-0.5">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
