import { About } from "@/components/home/about";
import { Blog } from "@/components/home/blog";
import { More } from "@/components/layout/more";
import { Projects } from "@/components/home/projects";
import { ProjectSkeleton } from "@/components/home/project-list";
import { PageTransition } from "@/components/layout/transitions";
import { Suspense } from "react";

export default function Home() {
  return (
    <PageTransition>
      <div className="mt-16 space-y-16">
        <About />
        <Suspense fallback={<ProjectSkeleton />}>
          <Projects />
        </Suspense>
        <Blog />
        <More />
      </div>
    </PageTransition>
  );
}
