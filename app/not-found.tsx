import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";

export default function NotFound() {
  return (
    <div className="mt-16 space-y-3">
      <p className="text-muted-foreground text-sm">404</p>
      <h1 className="text-3xl font-medium tracking-tight">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeftIcon className="size-3.5" />
        Back home
      </Link>
    </div>
  );
}
