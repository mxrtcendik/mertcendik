"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { personalInfo } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const Title = pathname === "/" ? "h1" : "p";

  return (
    <header className={cn(className)}>
      <div className="flex items-start justify-between gap-4">
        <Link href="/" className="block transition-opacity hover:opacity-80">
          <Title className="text-2xl font-medium tracking-tight">
            {personalInfo.name}
          </Title>
          <p className="text-muted-foreground text-sm font-medium">
            {personalInfo.title}
          </p>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
