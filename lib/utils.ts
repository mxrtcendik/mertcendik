import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const WORDS_PER_MINUTE = 200;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// long: "October 30, 2026", medium: "Oct 30, 2026", short: "Oct 30".
export function formatDate(
  date: string,
  style: "long" | "medium" | "short" = "long"
) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    year: style === "short" ? undefined : "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatMonth(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

export function calculateReadingTime(content: string) {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/[#>*_~\-]+/g, " ");

  const words = text.match(/\b[\p{L}\p{N}'’]+\b/gu)?.length ?? 0;

  if (words === 0) {
    return "0 min read";
  }

  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

  return `${minutes} min read`;
}

// Hover styles shared by the project and post cards. Each card adds its own
// press styles, since Tailwind needs those class names written out in full.
export const cardSurface =
  "rounded-lg p-4 transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-surface-hover";
