import { socialLinks } from "@/lib/constants";
import { Rss } from "lucide-react";
import Link from "next/link";

export function More() {
  const xLink = socialLinks.find((link) => link.name === "X");
  const githubLink = socialLinks.find((link) => link.name === "GitHub");
  const linkedinLink = socialLinks.find((link) => link.name === "LinkedIn");
  const instagramLink = socialLinks.find((link) => link.name === "Instagram");

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-medium tracking-tight">More</h2>
      <p className="text-muted-foreground text-base">
        You can look at my work on{" "}
        {xLink && (
          <Link
            href={xLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            X
          </Link>
        )}{" "}
        and my code on{" "}
        {githubLink && (
          <Link
            href={githubLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            GitHub
          </Link>
        )}
        . I also have{" "}
        {linkedinLink && (
          <Link
            href={linkedinLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            LinkedIn
          </Link>
        )}{" "}
        and{" "}
        {instagramLink && (
          <Link
            href={instagramLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Instagram
          </Link>
        )}
        .
      </p>
      <Link
        href="/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
      >
        <Rss className="h-4 w-4" />
        RSS Feed
      </Link>
    </section>
  );
}
