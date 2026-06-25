import { PostList } from "@/components/post-list";
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
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-medium tracking-tight">Blog</h2>
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          View all
        </Link>
      </div>
      <PostList posts={posts} />
    </section>
  );
}
