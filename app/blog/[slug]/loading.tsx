import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <article className="mt-12 space-y-6">
      <Skeleton className="h-4 w-16" />
      <div className="space-y-3">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="max-w-[65ch] space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
        <Skeleton className="h-4 w-4/5" />
      </div>
    </article>
  );
}
