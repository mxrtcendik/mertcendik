"use client";

import type { Project } from "@/lib/types";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export function ProjectList({ projects }: { projects: Project[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.name}
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.5, delay: index * 0.1 }
          }
        >
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-muted-foreground/10 block rounded-lg p-4 transition-colors"
          >
            <div className="text-base font-medium">{project.name}</div>
            <div className="text-muted-foreground mt-0.5 text-sm">
              {project.description}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
