"use client";

import { EyeIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useState } from "react";

const requests = new Map<string, Promise<number | null>>();

function loadCount(slug: string) {
  const existing = requests.get(slug);
  if (existing) return existing;

  const key = `viewed:${slug}`;
  let seen = false;
  try {
    seen = sessionStorage.getItem(key) === "1";
  } catch {}

  const request = fetch(`/api/views/${slug}`, {
    method: seen ? "GET" : "POST",
  })
    .then((response) =>
      response.ok ? (response.json() as Promise<{ count?: number }>) : null
    )
    .then((data) => {
      if (typeof data?.count !== "number") return null;
      try {
        sessionStorage.setItem(key, "1");
      } catch {}
      return data.count;
    })
    .catch(() => null);

  requests.set(slug, request);
  return request;
}

export function ViewCount({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    loadCount(slug).then((value) => {
      if (active) setCount(value);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-1">
      <EyeIcon className="size-3.5" />
      <span>
        {count.toLocaleString("en-US")} {count === 1 ? "view" : "views"}
      </span>
    </div>
  );
}
