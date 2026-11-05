import { More } from "@/components/layout/more";
import { PostList } from "@/components/blog/post-list";
import { PageTransition } from "@/components/layout/transitions";
import { getBlogPosts } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import type { BlogPost } from "@/lib/types";
import { formatMonth } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: `Posts by ${personalInfo.name} about interface design, motion, and the things I build.`,
};

function groupByMonth(posts: BlogPost[]) {
  const groups = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const month = post.date ? formatMonth(post.date) : "Undated";
    groups.set(month, [...(groups.get(month) ?? []), post]);
  }
  return [...groups];
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <PageTransition>
      <div className="mt-12 space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Blog
          </h1>
          <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
            Short posts about interface design, motion, and the small tools I
            build.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-10">
            {groupByMonth(posts).map(([month, monthPosts]) => (
              <section key={month} className="space-y-4">
                <h2 className="text-muted-foreground text-sm font-medium tracking-tight">
                  {month}
                </h2>
                <PostList posts={monthPosts} dateStyle="short" />
              </section>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
        <div className="pt-6">
          <More />
        </div>
      </div>
    </PageTransition>
  );
}
