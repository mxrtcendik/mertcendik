import { PostListSkeleton } from "@/components/post-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-12 space-y-10">
      <div className="space-y-3">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <PostListSkeleton />
    </div>
  );
}
