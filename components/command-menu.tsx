"use client";

import { projects, socialLinks } from "@/lib/constants";
import type { BlogPost } from "@/lib/types";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  Folder,
  Github,
  Home,
  Instagram,
  Linkedin,
  Loader2,
  Moon,
  Rss,
  Sun,
  Twitter,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <Github className="size-4" />,
  X: <Twitter className="size-4" />,
  LinkedIn: <Linkedin className="size-4" />,
  Instagram: <Instagram className="size-4" />,
};

const itemClass =
  "flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm hover:bg-accent aria-selected:bg-accent";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    let mounted = true;

    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setPosts(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setPosts([]);
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    fn();
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command Menu"
      className="fixed inset-0 z-50"
    >
      <Dialog.Title className="sr-only">Command Menu</Dialog.Title>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.15 }}
              className="bg-background/80 fixed inset-0"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
            >
              <div className="border-border bg-popover overflow-hidden rounded-xl border shadow-lg">
                <Command.Input
                  placeholder="Type a command or search..."
                  className="placeholder:text-muted-foreground focus-visible:ring-ring/50! w-full border-none! bg-transparent px-4 py-3 text-sm outline-none! focus-visible:ring-1!"
                  autoFocus
                />

                <motion.div initial="hidden" animate="visible">
                  <Command.List className="max-h-80 overflow-y-auto p-2">
                    <Command.Empty className="text-muted-foreground py-6 text-center text-sm">
                      No results found.
                    </Command.Empty>

                    <Command.Group
                      heading="Navigation"
                      className="text-muted-foreground px-2 py-1.5 text-xs font-medium"
                    >
                      <motion.div>
                        <Command.Item
                          value="home"
                          onSelect={() => run(() => router.push("/"))}
                          className={itemClass}
                        >
                          <Home className="size-4" />
                          Home
                        </Command.Item>
                      </motion.div>
                      <motion.div>
                        <Command.Item
                          value="rss feed"
                          onSelect={() => run(() => router.push("/rss.xml"))}
                          className={itemClass}
                        >
                          <Rss className="size-4" />
                          RSS Feed
                        </Command.Item>
                      </motion.div>
                    </Command.Group>

                    {isLoading ? (
                      <motion.div className="text-muted-foreground flex items-center justify-center gap-2 py-4 text-sm">
                        <Loader2 className="size-4 animate-spin" />
                        Loading posts...
                      </motion.div>
                    ) : (
                      posts.length > 0 && (
                        <Command.Group
                          heading="Blog posts"
                          className="text-muted-foreground px-2 py-1.5 text-xs font-medium"
                        >
                          {posts.map((post) => (
                            <motion.div key={post.slug}>
                              <Command.Item
                                value={`blog ${post.title}`}
                                onSelect={() =>
                                  run(() => router.push(`/blog/${post.slug}`))
                                }
                                className={itemClass}
                              >
                                <FileText className="size-4" />
                                {post.title}
                              </Command.Item>
                            </motion.div>
                          ))}
                        </Command.Group>
                      )
                    )}

                    <Command.Group
                      heading="Projects"
                      className="text-muted-foreground px-2 py-1.5 text-xs font-medium"
                    >
                      {projects.map((project) => (
                        <motion.div key={project.name}>
                          <Command.Item
                            value={`project ${project.name}`}
                            onSelect={() =>
                              run(() => window.open(project.url, "_blank"))
                            }
                            className={itemClass}
                          >
                            <Folder className="size-4" />
                            {project.name}
                          </Command.Item>
                        </motion.div>
                      ))}
                    </Command.Group>

                    <Command.Group
                      heading="Social"
                      className="text-muted-foreground px-2 py-1.5 text-xs font-medium"
                    >
                      {socialLinks.map((link) => (
                        <motion.div key={link.name}>
                          <Command.Item
                            value={`social ${link.name}`}
                            onSelect={() =>
                              run(() => window.open(link.url, "_blank"))
                            }
                            className={itemClass}
                          >
                            {socialIcons[link.name] ?? (
                              <Folder className="size-4" />
                            )}
                            {link.name}
                          </Command.Item>
                        </motion.div>
                      ))}
                    </Command.Group>

                    <Command.Group
                      heading="Theme"
                      className="text-muted-foreground px-2 py-1.5 text-xs font-medium"
                    >
                      <motion.div>
                        <Command.Item
                          value="light mode"
                          onSelect={() => run(() => setTheme("light"))}
                          className={itemClass}
                        >
                          <Sun className="size-4" />
                          Light Mode
                        </Command.Item>
                      </motion.div>
                      <motion.div>
                        <Command.Item
                          value="dark mode"
                          onSelect={() => run(() => setTheme("dark"))}
                          className={itemClass}
                        >
                          <Moon className="size-4" />
                          Dark Mode
                        </Command.Item>
                      </motion.div>
                    </Command.Group>
                  </Command.List>
                </motion.div>

                <motion.div className="border-border text-muted-foreground border-t px-4 py-2 text-xs">
                  Press{" "}
                  <kbd className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                    esc
                  </kbd>{" "}
                  to close
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Command.Dialog>
  );
}
