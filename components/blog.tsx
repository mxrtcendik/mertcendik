import { PostList } from "@/components/post-list";
import { getBlogPosts } from "@/lib/blog";

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
      <PostList posts={posts} />
    </section>
  );
}
