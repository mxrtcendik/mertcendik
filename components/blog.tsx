import { PostList } from "@/components/post-list";
import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";

export function Blog() {
  const posts = getBlogPosts();
  const preview = posts.slice(0, 3);

  if (posts.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-muted-foreground text-sm font-medium tracking-tight">
          Blog
        </h2>
        <p className="text-muted-foreground">Coming soon.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-muted-foreground text-sm font-medium tracking-tight">
          Blog
        </h2>
        {posts.length > preview.length && (
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            View all
          </Link>
        )}
      </div>
      <PostList posts={preview} />
    </section>
  );
}
