import { PostList } from "@/components/post-list";
import { getBlogPosts } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${personalInfo.name} on design, engineering, and shipping software.`,
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="mt-12 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Blog
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          My notes on design, engineering, building products and the details
          that make software feel right.
        </p>
      </div>

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-muted-foreground">No posts yet.</p>
      )}
    </div>
  );
}
