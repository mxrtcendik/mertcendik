"use client";

import { CheckCircleIcon, LinkIcon } from "@phosphor-icons/react/ssr";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useState } from "react";

const swap = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12 } },
};

export function SharePost() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground -my-2 inline-flex items-center gap-1.5 py-2 text-sm transition-colors"
      aria-label="Copy link"
      title="Copy link"
    >
      {/* "user" turns the slide off when reduced motion is on; the fade stays. */}
      <MotionConfig reducedMotion="user">
        <div className="relative size-3.5">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="check"
                variants={swap}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                <CheckCircleIcon className="size-3.5 text-green-600 dark:text-green-500" />
              </motion.div>
            ) : (
              <motion.div
                key="link"
                variants={swap}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                <LinkIcon className="size-3.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied-text"
                variants={swap}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="block text-green-600 dark:text-green-500"
              >
                Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy-text"
                variants={swap}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="block"
              >
                Copy link
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </button>
  );
}
