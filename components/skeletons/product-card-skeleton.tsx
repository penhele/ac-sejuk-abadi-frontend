import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="border-gray-200 border rounded-lg ">
      <Skeleton className="w-full aspect-square" />

      <div className="p-4 flex flex-col space-y-16">
        <Skeleton className="w-40 h-4 line-clamp-3" />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>

          <div className="flex flex-row justify-between">
            <div className="space-y-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-32 h-4" />
            </div>

            <Skeleton className="w-12 h-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
