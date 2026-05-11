import { Skeleton } from "../ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="space-y-between-section">
      <Skeleton className="h-4 w-40" />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="aspect-square" />

          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square" />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="w-40 h-4" />

            <div className="space-y-2">
              <Skeleton className="w-64 h-4" />

              <div className="flex flex-row gap-2">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="w-40 h-8" />

            <div className="min-h-80 space-y-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-4" />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-8 w-40" />

            <div className="flex justify-between">
              <div className="flex flex-row gap-4">
                <Skeleton className="aspect-square h-8" />

                <div className="w-8">
                  <Skeleton className="aspect-square h-8" />
                </div>

                <Skeleton className="aspect-square h-8" />
              </div>

              <Skeleton className="h-8 w-40" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className="h-8" />
              ))}
            </div>

            <Skeleton className="h-2" />

            <div className="flex flex-row gap-2">
              <Skeleton className="h-4 w-40" />

              <div className="flex flex-row gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 aspect-square" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
