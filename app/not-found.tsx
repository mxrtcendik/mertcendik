import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { PageTransition } from "@/components/transitions";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="mt-16 space-y-3">
        <p className="text-muted-foreground text-sm">404</p>
        <h1 className="text-3xl font-medium tracking-tight">Page not found</h1>
        <p className="text-muted-foreground max-w-md">
          This page doesn&apos;t exist, or it may have moved.
        </p>
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground -my-2 inline-flex items-center gap-1.5 py-2 text-sm transition-colors"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back home
        </Link>
      </div>
    </PageTransition>
  );
}
