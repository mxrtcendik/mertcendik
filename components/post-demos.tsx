"use client";

import { useEffect, useRef, useState } from "react";

const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";

export function PressDemo() {
  return (
    <div className="my-6">
      <button
        type="button"
        className="bg-foreground text-background rounded-md px-3 py-1.5 text-sm active:scale-[0.97]"
        style={{ transition: `transform 160ms ${easeOut}` }}
      >
        Save
      </button>
    </div>
  );
}

export function EasingDemo() {
  return (
    <div className="my-6 space-y-4">
      <EasingRow label="ease-in" easing="ease-in" />
      <EasingRow label="ease-out" easing={easeOut} />
      <style>{`
        .easing-track {
          position: relative;
          height: 2rem;
          overflow: hidden;
          border-radius: 0.375rem;
          background: color-mix(in oklch, var(--foreground) 8%, var(--background));
          container-type: inline-size;
        }
        .dark .easing-track {
          background: var(--muted);
        }
        .easing-token {
          position: absolute;
          top: 0.25rem;
          left: 0.25rem;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.125rem;
          background: var(--foreground);
          transform: translateX(0);
        }
        .easing-row:hover .easing-token,
        .easing-row:focus-within .easing-token {
          transform: translateX(calc(100cqi - 2rem));
        }
      `}</style>
    </div>
  );
}

function EasingRow({ label, easing }: { label: string; easing: string }) {
  return (
    <div className="easing-row">
      <div className="text-muted-foreground mb-1.5 text-sm">{label}</div>
      <div className="easing-track">
        <div
          className="easing-token"
          style={{ transition: `transform 400ms ${easing}` }}
        />
      </div>
    </div>
  );
}

export function HoldDemo() {
  return (
    <div className="my-6">
      <button type="button" className="hold-demo">
        <span className="hold-demo-fill" aria-hidden="true" />
        <span className="relative">Hold to confirm</span>
      </button>
      <style>{`
        .hold-demo {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 0.375rem;
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          transition: transform 160ms ${easeOut};
        }
        .hold-demo-fill {
          position: absolute;
          inset: 0;
          background: color-mix(in oklch, var(--foreground) 12%, transparent);
          clip-path: inset(0 100% 0 0);
          transition: clip-path 200ms ${easeOut};
        }
        .hold-demo:active {
          transform: scale(0.97);
        }
        .hold-demo:active .hold-demo-fill {
          clip-path: inset(0 0 0 0);
          transition: clip-path 2s linear;
        }
      `}</style>
    </div>
  );
}

export function ConfirmDemo() {
  const [phase, setPhaseState] = useState<"idle" | "holding" | "confirmed">(
    "idle",
  );
  const [pressed, setPressed] = useState(false);
  const [result, setResult] = useState("A click does nothing.");
  const phaseRef = useRef(phase);
  const abortedRef = useRef(false);
  const timers = useRef<number[]>([]);

  function setPhase(next: "idle" | "holding" | "confirmed") {
    phaseRef.current = next;
    setPhaseState(next);
  }

  function clearTimers() {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
  }

  function later(fn: () => void, ms: number) {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  }

  useEffect(() => clearTimers, []);

  function idle() {
    abortedRef.current = false;
    setPressed(false);
    setPhase("idle");
    setResult("A click does nothing.");
  }

  return (
    <div className="my-6">
      <button
        type="button"
        className="confirm-demo"
        data-state={phase}
        data-pressed={pressed ? "true" : "false"}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          clearTimers();
          abortedRef.current = false;
          event.currentTarget.setPointerCapture(event.pointerId);
          setPressed(true);
          setPhase("holding");
          setResult("Hold it through.");
          later(() => {
            if (abortedRef.current || phaseRef.current !== "holding") return;
            setPhase("confirmed");
            setResult("Deleted.");
          }, 1500);
        }}
        onPointerMove={(event) => {
          if (phaseRef.current !== "holding" || abortedRef.current) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const outside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;
          if (!outside) return;
          abortedRef.current = true;
          clearTimers();
          setPressed(false);
          setPhase("idle");
          setResult("A click does nothing.");
        }}
        onPointerUp={() => {
          if (abortedRef.current) {
            setPressed(false);
            abortedRef.current = false;
            return;
          }
          if (phaseRef.current === "confirmed") {
            setPressed(false);
            later(idle, 900);
            return;
          }
          clearTimers();
          idle();
        }}
        onPointerCancel={() => {
          clearTimers();
          idle();
        }}
        onClick={(event) => {
          if (phaseRef.current !== "confirmed") event.preventDefault();
        }}
      >
        <span className="confirm-demo-fill" aria-hidden="true" />
        <span className="relative">
          {phase === "confirmed" ? "Deleted" : "Hold to delete"}
        </span>
      </button>
      <p className="text-muted-foreground mt-3 text-sm" aria-live="polite">
        {result}
      </p>
      <style>{`
        .confirm-demo {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 0.375rem;
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          transition: transform 160ms ${easeOut};
        }
        .confirm-demo-fill {
          position: absolute;
          inset: 0;
          background: color-mix(in oklch, var(--foreground) 12%, transparent);
          clip-path: inset(0 100% 0 0);
          transition: clip-path 200ms ${easeOut};
        }
        .confirm-demo[data-pressed="true"] {
          transform: scale(0.97);
        }
        .confirm-demo[data-state="holding"] .confirm-demo-fill,
        .confirm-demo[data-state="confirmed"] .confirm-demo-fill {
          clip-path: inset(0 0 0 0);
          transition: clip-path 1.5s linear;
        }
        @media (prefers-reduced-motion: reduce) {
          .confirm-demo {
            transition: none;
          }
          .confirm-demo[data-pressed="true"] {
            transform: none;
          }
          .confirm-demo[data-state="idle"] .confirm-demo-fill {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

export function HitDemo() {
  return (
    <div className="my-6 flex flex-wrap items-end gap-10">
      <div>
        <div className="text-muted-foreground mb-2 text-sm">16px</div>
        <button
          type="button"
          aria-label="Small target"
          className="bg-foreground block size-4 rounded-sm"
        />
      </div>
      <div>
        <div className="text-muted-foreground mb-2 text-sm">44px</div>
        <button
          type="button"
          aria-label="Adequate target"
          className="flex size-11 items-center justify-center"
        >
          <span className="bg-foreground block size-4 rounded-sm" />
        </button>
      </div>
    </div>
  );
}

export function ResponseDemo() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="my-6">
      <button
        type="button"
        onClick={() => setCopied(true)}
        className={
          copied
            ? "text-sm text-green-600 dark:text-green-500"
            : "text-foreground text-sm"
        }
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

export function ContrastDemo() {
  return (
    <div className="my-6 space-y-4">
      <div>
        <div className="text-muted-foreground mb-1.5 text-sm">
          Close to the page
        </div>
        <div className="bg-muted h-8 rounded-md" />
      </div>
      <div>
        <div className="text-muted-foreground mb-1.5 text-sm">
          Far enough to see
        </div>
        <div
          className="h-8 rounded-md"
          style={{
            background:
              "color-mix(in oklch, var(--foreground) 8%, var(--background))",
          }}
        />
      </div>
    </div>
  );
}
