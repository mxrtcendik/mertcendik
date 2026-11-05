"use client";

import Link from "next/link";
import { useLayoutEffect, type ComponentProps, type MouseEvent } from "react";

// Set when someone clicks through to a post, and read once by the post page.
// Back and forward navigation never set it, so the browser can still restore
// the reader's scroll position there.
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

// For opening a post from code, like the search menu, instead of a link.
export function markScrollToTop() {
  scrollToTopOnArrival = true;
}

// A link to a post. Use it instead of Link wherever a post is opened, so the
// post page knows to start at the top.
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

// Scrolls to the top while the new page is being put in place, before the
// view transition takes its picture of it. Without this, the page is captured
// at the old scroll position, and the title has nowhere visible to move to.
export function ScrollToTopOnArrival() {
  useLayoutEffect(() => {
    if (!scrollToTopOnArrival) return;
    scrollToTopOnArrival = false;
    // "instant" overrides the page's smooth scrolling. A smooth scroll would
    // still be at the old position when the picture is taken.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
