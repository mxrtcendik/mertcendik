import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const WORDS_PER_MINUTE = 200;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
