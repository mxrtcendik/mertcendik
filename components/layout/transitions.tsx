import { ViewTransition, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}

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

export function ProjectTitleTransition({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <ViewTransition name={`project-title-${name}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
