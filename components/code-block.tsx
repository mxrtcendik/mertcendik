"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

function extractCodeText(node: React.ReactNode): string {
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractCodeText).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: React.ReactNode } }).props;
    if (props && "children" in props) {
      return extractCodeText(props.children);
    }
  }
  return "";
}

const languageNames: Record<string, string> = {
  css: "CSS",
  html: "HTML",
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  json: "JSON",
  bash: "Shell",
  sh: "Shell",
};

// rehype-highlight puts the language on the <code> inside, as "language-css".
function getLanguage(node: React.ReactNode): string | null {
  if (!node || typeof node !== "object" || !("props" in node)) return null;
  const className = (node as { props?: { className?: string } }).props
    ?.className;
  const match = className?.match(/language-([\w-]+)/);
  if (!match) return null;
  return languageNames[match[1]] ?? match[1].toUpperCase();
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const codeElement = preRef.current?.querySelector("code");
    const text = codeElement?.textContent || extractCodeText(children);

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const language = getLanguage(children);

  // The label and copy button get their own row above the code. Floating over
  // it, they covered long lines on narrow screens.
  return (
    <div className="bg-muted my-4 rounded-lg">
      <div className="flex items-center justify-between py-1 pr-1.5 pl-4">
        <span className="text-muted-foreground text-xs select-none">
          {language ?? ""}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground hover:bg-foreground/8 rounded-md p-2 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:active:scale-100"
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-500" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
          <span className="sr-only" aria-live="polite">
            {copied ? "Copied" : ""}
          </span>
        </button>
      </div>
      <pre
        ref={preRef}
        className={cn(className, "m-0 rounded-none bg-transparent pt-0")}
      >
        {children}
      </pre>
    </div>
  );
}
