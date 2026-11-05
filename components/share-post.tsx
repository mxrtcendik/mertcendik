"use client";

import { cn } from "@/lib/utils";
import { CheckCircleIcon, LinkIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Both states stay rendered on top of each other, and CSS crossfades between
// them: the old one leaves upward while the new one arrives from below.
// Reduced motion keeps the fade and drops the slide.
function Swap({
  copied,
  idle,
  done,
}: {
  copied: boolean;
  idle: ReactNode;
  done: ReactNode;
}) {
  const layer =
    "col-start-1 row-start-1 transition-[opacity,translate] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:translate-none";

  return (
    <span className="grid">
      <span
        aria-hidden={copied}
        className={cn(layer, copied && "-translate-y-1 opacity-0")}
      >
        {idle}
      </span>
      <span
        aria-hidden={!copied}
        className={cn(layer, !copied && "translate-y-1 opacity-0")}
      >
        {done}
      </span>
    </span>
  );
}

export function SharePost() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground -my-2 inline-flex items-center gap-1.5 py-2 text-sm transition-colors"
      aria-label="Copy link"
      title="Copy link"
    >
      <Swap
        copied={copied}
        idle={<LinkIcon className="size-3.5" />}
        done={
          <CheckCircleIcon className="size-3.5 text-green-600 dark:text-green-500" />
        }
      />
      <Swap
        copied={copied}
        idle="Copy link"
        done={
          <span className="text-green-600 dark:text-green-500">Copied</span>
        }
      />
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </button>
  );
}
