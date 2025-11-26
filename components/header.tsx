import { ThemeToggle } from "@/components/theme-toggle";
import { personalInfo } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header({ className }: { className?: string }) {
  return (
    <section className={cn("pt-12", className)}>
      <div className="flex items-center justify-between">
        <Link href="/" className="block transition-opacity hover:opacity-80">
          <h1 className="text-lg font-medium tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-muted-foreground text-base font-medium">
            {personalInfo.title}
          </p>
        </Link>
        <ThemeToggle />
      </div>
    </section>
  );
}
