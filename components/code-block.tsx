"use client";

import { Check, Copy } from "lucide-react";
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

  return (
    <div className="group relative">
      <pre ref={preRef} className={className}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="bg-muted/80 hover:bg-muted border-border/50 absolute top-2 right-2 rounded-lg border p-2 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
