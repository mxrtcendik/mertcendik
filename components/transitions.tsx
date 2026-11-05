import { ViewTransition, type ReactNode } from "react";

// Wraps a page's content so it fades out and back in on navigation. It has to
// go in each page, not the layout, because the layout never leaves the screen.
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}

// The same post title in a list and on the post page, so it can move from one
// to the other. default="none" keeps it still during unrelated transitions.
export function PostTitleTransition({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <ViewTransition name={`post-title-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
