"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Something went wrong. Please try again."
        );
      }

      setSuccess(true);
      reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-4" aria-labelledby="newsletter-heading">
      <h2
        id="newsletter-heading"
        className="text-xl font-medium tracking-tight"
      >
        Newsletter
      </h2>
      <p className="text-muted-foreground">
        Stay updated with my latest posts and projects.
      </p>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-lg bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400"
            role="status"
            aria-live="polite"
          >
            <Check className="size-5 shrink-0" />
            <span>Successfully subscribed! Check your email to confirm.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email")}
                  disabled={isSubmitting}
                  className="ring-ring/30! focus-visible:ring-ring/40! flex-1 border-none! ring-1! outline-none! focus-visible:ring-[1.5px]!"
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span className="sr-only">Subscribing...</span>
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-destructive text-sm"
                    role="alert"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-destructive/10 text-destructive flex items-center gap-3 rounded-md p-3 text-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  <XCircle className="size-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
