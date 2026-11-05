"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

// The dialog and its search library are the heaviest code on the page, and
// nobody needs them until they open search. They load as soon as the pointer
// or keyboard focus reaches the button, or when Cmd/Ctrl+K is pressed. Anything
// typed while they load is kept (see "pending" below).
const loadDialog = () => import("@/components/command-menu-dialog");
const CommandMenuDialog = dynamic(loadDialog, { ssr: false });

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
  // Only mount the dialog once it's been opened, so it never renders early.
  const [used, setUsed] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const shortcut = useShortcutLabel();
  // If search opens before the dialog has loaded, keep what's typed and hand
  // it over as the starting query, so no keystrokes are lost.
  const [pending, setPending] = useState("");
  const state = useRef({ open: false, ready: false });
  const onReady = useCallback(() => {
    state.current.ready = true;
  }, []);

  function openMenu(next: boolean) {
    state.current.open = next;
    if (next) setUsed(true);
    setOpen(next);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        const next = !state.current.open;
        state.current.open = next;
        setUsed(true);
        setOpen(next);
        if (next) setPending("");
        return;
      }

      const { open, ready } = state.current;
      if (!open || ready || event.metaKey || event.ctrlKey || event.altKey)
        return;
      if (event.key.length === 1) {
        event.preventDefault();
        setPending((text) => text + event.key);
      } else if (event.key === "Backspace") {
        event.preventDefault();
        setPending((text) => text.slice(0, -1));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        ref={button}
        type="button"
        onClick={() => openMenu(true)}
        onPointerEnter={() => void loadDialog()}
        onFocus={() => void loadDialog()}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -my-2.5 flex h-11 cursor-pointer items-center gap-2 rounded-md px-2.5 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:ring-1 focus-visible:outline-none active:scale-[0.97] motion-reduce:active:scale-100"
      >
        {/* The name comes from the content: "Search", plus the shortcut where
            it's shown, so what people see is part of what they can say. */}
        <MagnifyingGlassIcon aria-hidden className="size-5" />
        <span className="sr-only">Search</span>
        {shortcut && (
          <kbd className="border-border hidden rounded border px-1.5 py-0.5 font-sans text-xs [@media(hover:hover)_and_(pointer:fine)]:inline">
            {shortcut}
          </kbd>
        )}
      </button>
      {used && (
        <CommandMenuDialog
          open={open}
          onOpenChange={openMenu}
          returnFocusTo={button}
          initialQuery={pending}
          onReady={onReady}
        />
      )}
    </>
  );
}
