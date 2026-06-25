"use client";

import type { BlogPost } from "@/lib/types";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function PostList({ posts }: { posts: BlogPost[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-3">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
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
            href={`/blog/${post.slug}`}
            className="hover:bg-muted-foreground/10 block rounded-lg p-4 transition-colors"
          >
            <div className="space-y-2">
              <div className="text-base font-medium">{post.title}</div>
              {post.description && (
                <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                  {post.description}
                </p>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
