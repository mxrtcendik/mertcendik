import { socialLinks } from "@/lib/constants";
import Link from "next/link";

export function More() {
  const xLink = socialLinks.find((link) => link.name === "X");
  const githubLink = socialLinks.find((link) => link.name === "GitHub");

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-medium tracking-tight">More</h2>
      <p className="text-base text-muted-foreground">
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
        .
      </p>
    </section>
  );
}
