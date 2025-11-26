"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotate: 10,
    transition: {
      duration: 0.15,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 5, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    filter: "blur(4px)",
    transition: {
      duration: 0.15,
    },
  },
};

const buttonVariants = {
  tap: { scale: 0.95 },
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
    <motion.button
      onClick={handleCopy}
      variants={buttonVariants}
      whileTap="tap"
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      aria-label="Copy link"
      title="Copy link"
    >
      <div className="relative size-3.5">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check className="size-3.5 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              key="link"
              variants={iconVariants}
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
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="block text-green-500"
            >
              Copied!
            </motion.span>
          ) : (
            <motion.span
              key="copy-text"
              variants={textVariants}
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
    </motion.button>
  );
}
