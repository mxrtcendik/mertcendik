"use client";

import { markScrollToTop } from "@/components/post-link";
import { useTheme } from "@/components/theme-provider";
import { personalInfo, projects, socialLinks } from "@/lib/constants";
import { ogPosts } from "@/lib/og-posts";
import { formatDate } from "@/lib/utils";
import { Autocomplete } from "@base-ui/react/autocomplete";
import { Dialog } from "@base-ui/react/dialog";
import {
  ArticleIcon,
  CubeIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  GithubLogoIcon,
  HouseIcon,
  LinkedinLogoIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  RssIcon,
  SunIcon,
  XLogoIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type Item = {
  value: string;
  label: string;
  // Extra text the search matches, like a post's description.
  keywords?: string;
  hint?: string;
  icon: Icon;
  action: Action;
};

// What happens when an item is picked. Items are plain data, and the menu
// runs the action, so searching never has to touch any of the handlers.
type Action =
  | { type: "page"; href: string }
  | { type: "post"; slug: string }
  | { type: "external"; url: string }
  | { type: "theme" }
  | { type: "email" };

type Group = { value: string; items: Item[] };

const socialIcons: Record<string, Icon> = {
  GitHub: GithubLogoIcon,
  X: XLogoIcon,
  LinkedIn: LinkedinLogoIcon,
};

const posts = Object.entries(ogPosts)
  .map(([slug, post]) => ({ slug, ...post }))
  .sort((a, b) => (b.date > a.date ? 1 : -1));

// Every word typed has to appear somewhere in the label or keywords, so
// "clip tab" finds the clip-path post even though the words aren't adjacent.
// Matches in the label count for more, so typing "dark" puts the theme action
// above a post that only mentions dark in its description. 0 means no match.
function score(item: Item, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 1;

  const label = item.label.toLowerCase();
  const text = `${label} ${item.keywords ?? ""}`.toLowerCase();
  if (!words.every((word) => text.includes(word))) return 0;

  if (label.startsWith(words[0])) return 3;
  if (words.every((word) => label.includes(word))) return 2;
  return 1;
}

// Filters each group, sorts its items by score, and moves the group with the
// best match to the top. Groups keep their order when the scores tie.
function rank(groups: Group[], query: string): Group[] {
  return groups
    .map((group) => {
      const scored = group.items
        .map((item) => ({ item, score: score(item, query) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score);
      return {
        group: { ...group, items: scored.map((entry) => entry.item) },
        best: scored[0]?.score ?? 0,
      };
    })
    .filter((entry) => entry.best > 0)
    .sort((a, b) => b.best - a.best)
    .map((entry) => entry.group);
}

function buildGroups(isDark: boolean, copied: boolean): Group[] {
  return [
    {
      value: "Pages",
      items: [
        {
          value: "page-home",
          label: "Home",
          icon: HouseIcon,
          action: { type: "page", href: "/" },
        },
        {
          value: "page-blog",
          label: "Blog",
          keywords: "posts writing",
          icon: ArticleIcon,
          action: { type: "page", href: "/blog" },
        },
      ],
    },
    {
      value: "Posts",
      items: posts.map((post) => ({
        value: `post-${post.slug}`,
        label: post.title,
        keywords: post.description,
        hint: formatDate(post.date, "short"),
        icon: FileTextIcon,
        action: { type: "post", slug: post.slug },
      })),
    },
    {
      value: "Projects",
      items: projects.map((project) => ({
        value: `project-${project.name}`,
        label: project.name,
        keywords: project.description,
        hint: project.site ? new URL(project.site).host : "GitHub",
        icon: CubeIcon,
        action: { type: "external", url: project.site ?? project.url },
      })),
    },
    {
      value: "Links",
      items: [
        ...socialLinks
          .filter((link) => socialIcons[link.name])
          .map((link): Item => ({
            value: `link-${link.name}`,
            label: link.name,
            icon: socialIcons[link.name],
            action: { type: "external", url: link.url },
          })),
        {
          value: "link-rss",
          label: "RSS feed",
          icon: RssIcon,
          action: { type: "external", url: "/rss.xml" },
        },
      ],
    },
    {
      value: "Actions",
      items: [
        {
          value: "action-theme",
          label: isDark ? "Switch to light theme" : "Switch to dark theme",
          keywords: "theme dark light mode appearance",
          icon: isDark ? SunIcon : MoonIcon,
          action: { type: "theme" },
        },
        {
          value: "action-email",
          label: "Copy email address",
          keywords: `email contact mail ${personalInfo.email}`,
          hint: copied ? "Copied" : personalInfo.email,
          icon: EnvelopeSimpleIcon,
          action: { type: "email" },
        },
      ],
    },
  ];
}

function subscribeNothing() {
  return () => {};
}

// Shows ⌘K on Apple devices and Ctrl K everywhere else. Renders nothing on
// the server, since the platform isn't known there.
function useShortcutLabel() {
  return useSyncExternalStore(
    subscribeNothing,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K"),
    () => null
  );
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const shortcut = useShortcutLabel();
  const hintId = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setQuery("");
      clearTimeout(closeTimer.current);
      setCopied(false);
    }
  }

  const isDark = resolvedTheme === "dark";
  const groups = buildGroups(isDark, copied);

  function run(action: Action) {
    if (action.type === "email") {
      navigator.clipboard
        .writeText(personalInfo.email)
        .then(() => {
          // Stay open for a moment so the "Copied" is actually seen.
          setCopied(true);
          closeTimer.current = setTimeout(() => onOpenChange(false), 700);
        })
        .catch(() => {
          onOpenChange(false);
          window.location.href = `mailto:${personalInfo.email}`;
        });
      return;
    }

    onOpenChange(false);

    if (action.type === "page") {
      router.push(action.href);
    } else if (action.type === "post") {
      markScrollToTop();
      router.push(`/blog/${action.slug}`);
    } else if (action.type === "external") {
      window.open(action.url, "_blank", "noopener,noreferrer");
    } else {
      setTheme(isDark ? "light" : "dark");
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -my-2.5 flex h-11 cursor-pointer items-center gap-2 rounded-md px-2.5 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:ring-1 focus-visible:outline-none active:scale-[0.97] motion-reduce:active:scale-100"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="size-5" />
        {shortcut && (
          <kbd className="border-border hidden rounded border px-1.5 py-0.5 font-sans text-xs [@media(hover:hover)_and_(pointer:fine)]:inline">
            {shortcut}
          </kbd>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* No enter or exit animation: this opens from the keyboard, often
            many times a day, and should feel instant. */}
        <Dialog.Backdrop className="fixed inset-0 bg-black/20 dark:bg-black/60" />
        <Dialog.Viewport className="fixed inset-0 flex items-start justify-center px-4 pt-[12vh]">
          <Dialog.Popup
            aria-label="Search"
            className="bg-popover text-popover-foreground border-border flex max-h-[min(32rem,76dvh)] w-full max-w-lg flex-col overflow-hidden rounded-xl border shadow-2xl shadow-black/10 outline-none"
          >
            <Autocomplete.Root
              open
              inline
              items={groups}
              filteredItems={rank(groups, query)}
              value={query}
              onValueChange={setQuery}
              autoHighlight="always"
              keepHighlight
            >
              <div className="border-border flex items-center gap-3 border-b px-4">
                <MagnifyingGlassIcon
                  aria-hidden
                  className="text-muted-foreground size-4 shrink-0"
                />
                <Autocomplete.Input
                  aria-describedby={hintId}
                  placeholder="Search posts, projects, and more"
                  className="placeholder:text-muted-foreground h-12 w-full bg-transparent text-base outline-none sm:text-sm"
                />
              </div>
              <Dialog.Close className="sr-only">Close search</Dialog.Close>

              <div className="min-h-0 flex-1 [scroll-padding-block:0.5rem] overflow-y-auto overscroll-contain p-2">
                <Autocomplete.Empty>
                  <p className="text-muted-foreground px-2 py-8 text-center text-sm">
                    Nothing matches that.
                  </p>
                </Autocomplete.Empty>
                <Autocomplete.List>
                  {(group: Group) => (
                    <Autocomplete.Group
                      key={group.value}
                      items={group.items}
                      className="not-last:mb-2"
                    >
                      <Autocomplete.GroupLabel className="text-muted-foreground px-2 pt-1 pb-1.5 text-xs font-medium">
                        {group.value}
                      </Autocomplete.GroupLabel>
                      <Autocomplete.Collection>
                        {(item: Item) => {
                          const ItemIcon = item.icon;
                          return (
                            <Autocomplete.Item
                              key={item.value}
                              value={item}
                              onClick={() => run(item.action)}
                              className="data-highlighted:bg-foreground/8 flex min-h-10 cursor-pointer items-center gap-3 rounded-md px-2 text-sm outline-none select-none"
                            >
                              <ItemIcon
                                aria-hidden
                                className="text-muted-foreground size-4 shrink-0"
                              />
                              <span className="min-w-0 flex-1 truncate">
                                {item.label}
                              </span>
                              {item.hint && (
                                <span className="text-muted-foreground shrink-0 text-xs">
                                  {item.hint}
                                </span>
                              )}
                            </Autocomplete.Item>
                          );
                        }}
                      </Autocomplete.Collection>
                    </Autocomplete.Group>
                  )}
                </Autocomplete.List>
              </div>

              <div
                id={hintId}
                className="border-border text-muted-foreground flex items-center justify-end gap-4 border-t px-4 py-2.5 text-xs [@media(pointer:coarse)]:hidden"
              >
                <span>
                  <Key>↑</Key> <Key>↓</Key> to move
                </span>
                <span>
                  <Key>↵</Key> to open
                </span>
                <span>
                  <Key>esc</Key> to close
                </span>
              </div>
            </Autocomplete.Root>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Key({ children }: { children: string }) {
  return (
    <kbd className="border-border bg-muted rounded border px-1 py-px font-sans">
      {children}
    </kbd>
  );
}
