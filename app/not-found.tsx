import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium tracking-tight">404</h1>
      <p className="text-muted-foreground">Page not found.</p>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back home
      </Link>
    </div>
  );
}
