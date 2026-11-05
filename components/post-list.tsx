import type { BlogPost } from "@/lib/types";
import { cardSurface, cn, formatDate } from "@/lib/utils";
import { PostLink } from "@/components/post-link";
import { PostTitleTransition } from "@/components/transitions";

export function PostList({
  posts,
  dateStyle = "medium",
}: {
  posts: BlogPost[];
  dateStyle?: "medium" | "short";
}) {
  return (
    <div className="-mx-4 space-y-3">
      {posts.map((post) => (
        <PostLink
          key={post.slug}
          href={`/blog/${post.slug}`}
          className={cn(
            "active:bg-surface-active block active:scale-[0.99] motion-reduce:active:scale-100",
            cardSurface
          )}
        >
          <div className="space-y-1">
            <div className="flex items-baseline justify-between gap-4">
              <PostTitleTransition slug={post.slug}>
                <div className="min-w-0 text-base font-medium">
                  {post.title}
                </div>
              </PostTitleTransition>
              {post.date && (
                <time
                  dateTime={post.date}
                  className="text-muted-foreground shrink-0 text-sm"
                >
                  {formatDate(post.date, dateStyle)}
                </time>
              )}
            </div>
            {post.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {post.description}
              </p>
            )}
          </div>
        </PostLink>
      ))}
    </div>
  );
}
