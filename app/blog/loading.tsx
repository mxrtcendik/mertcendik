import { PostListSkeleton } from "@/components/post-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="space-y-4">
      <Skeleton className="h-7 w-24" />
      <PostListSkeleton />
    </section>
  );
}
