import { Header } from "@/components/header";
import { getBlogPosts } from "@/lib/blog";
import { personalInfo } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${personalInfo.name} on design, engineering, and shipping software.`,
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Header />
      <main className="mt-12 space-y-10">
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
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:bg-muted block rounded-xl p-4 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h2 className="text-lg font-medium tracking-tight">
                        {post.title}
                      </h2>
                      <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        {post.date && (
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              timeZone: "UTC",
                            })}
                          </time>
                        )}
                      </div>
                    </div>

                    {post.description && (
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {post.description}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </main>
    </>
  );
}
