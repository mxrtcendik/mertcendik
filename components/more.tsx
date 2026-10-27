import { personalInfo, socialLinks } from "@/lib/constants";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  RssIcon,
  XLogoIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

const linkClass =
  "text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors";

const icons: Record<string, Icon> = {
  GitHub: GithubLogoIcon,
  X: XLogoIcon,
  LinkedIn: LinkedinLogoIcon,
};

export function More() {
  const links = socialLinks.filter((link) => icons[link.name]);

  return (
    <section className="space-y-4">
      <h2 className="text-muted-foreground text-sm font-medium tracking-tight">
        More
      </h2>
      <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
        {links.map((link) => {
          const Icon = icons[link.name];

          return (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Icon className="size-4" />
                {link.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          );
        })}
        <li>
          <a href={`mailto:${personalInfo.email}`} className={linkClass}>
            <EnvelopeSimpleIcon className="size-4" />
            Email
          </a>
        </li>
        <li>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <RssIcon className="size-4" />
            RSS
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
