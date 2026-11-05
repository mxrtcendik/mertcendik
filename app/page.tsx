import { About } from "@/components/about";
import { Blog } from "@/components/blog";
import { More } from "@/components/more";
import { Projects } from "@/components/projects";
import { ProjectSkeleton } from "@/components/project-list";
import { PageTransition } from "@/components/transitions";
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
