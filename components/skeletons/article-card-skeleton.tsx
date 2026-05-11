import { Skeleton } from "../ui/skeleton";

export default function ArticleCardSkeleton() {
  return (
    <div className="border rounded-lg">
      <Skeleton className="aspect-video" />

      <div className="p-inside-card space-y-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />

          <div className="space-y-1">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        </div>

        <Skeleton className="h-4 w-8" />
      </div>
    </div>
  );
}
