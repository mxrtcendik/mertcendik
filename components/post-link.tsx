"use client";

import Link from "next/link";
import { useLayoutEffect, type ComponentProps, type MouseEvent } from "react";

let scrollToTopOnArrival = false;

function isPlainClick(event: MouseEvent) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function markScrollToTop() {
  scrollToTopOnArrival = true;
}

export function PostLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && isPlainClick(event)) {
          scrollToTopOnArrival = true;
        }
      }}
    />
  );
}

export function ScrollToTopOnArrival() {
  useLayoutEffect(() => {
    if (!scrollToTopOnArrival) return;
    scrollToTopOnArrival = false;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
