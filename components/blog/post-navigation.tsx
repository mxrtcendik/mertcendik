import { getBlogPosts } from "@/lib/blog";
import { PostLink } from "@/components/blog/post-link";

interface PostNavigationProps {
  currentSlug: string;
}

export function PostNavigation({ currentSlug }: PostNavigationProps) {
  const posts = getBlogPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) return null;

  const prevPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  if (!prevPost && !nextPost) return null;

  return (
    <nav className="border-border mt-12 flex items-center justify-between gap-4 border-t pt-8">
      {prevPost ? (
        <PostLink
          href={`/blog/${prevPost.slug}`}
          className="group flex flex-col items-start gap-1"
        >
          <span className="text-muted-foreground text-xs">Previous</span>
          <span className="text-sm font-medium">
            <span className="inline-block transition-[translate] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-0.5 motion-reduce:translate-none">
              ←
            </span>{" "}
            <span className="underline-offset-4 group-hover:underline">
              {prevPost.title}
            </span>
          </span>
        </PostLink>
      ) : (
        <div />
      )}
      {nextPost ? (
        <PostLink
          href={`/blog/${nextPost.slug}`}
          className="group flex flex-col items-end gap-1 text-right"
        >
          <span className="text-muted-foreground text-xs">Next</span>
          <span className="text-sm font-medium">
            <span className="underline-offset-4 group-hover:underline">
              {nextPost.title}
            </span>{" "}
            <span className="inline-block transition-[translate] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 motion-reduce:translate-none">
              →
            </span>
          </span>
        </PostLink>
      ) : (
        <div />
      )}
    </nav>
  );
}
