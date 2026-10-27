import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="hover:bg-muted-foreground/10 block rounded-lg p-4 transition-[background-color] duration-150"
        >
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="text-base font-medium">{post.title}</div>
              {post.date && (
                <time
                  dateTime={post.date}
                  className="text-muted-foreground shrink-0 text-sm"
                >
                  {formatDate(post.date)}
                </time>
              )}
            </div>
            {post.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                {post.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
