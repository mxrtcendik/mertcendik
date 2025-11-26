"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface ViewCounterProps {
  slug: string;
  increment?: boolean;
}

export function ViewCounter({ slug, increment = false }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchViews() {
      try {
        const res = await fetch(`/api/views/${slug}`, {
          method: increment ? "POST" : "GET",
          signal: controller.signal,
        });

        if (!res.ok) return;

        const data = await res.json();
        setViews(data.views);
      } catch {
      }
    }

    fetchViews();
    return () => controller.abort();
  }, [slug, increment]);

  if (views === null) return null;

  return (
    <span className="text-muted-foreground inline-flex items-center gap-1.5">
      <Eye className="size-3.5" />
      <span>{views.toLocaleString()} views</span>
    </span>
  );
}
