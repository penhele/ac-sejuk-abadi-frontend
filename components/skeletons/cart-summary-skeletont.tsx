import { Skeleton } from "../ui/skeleton";

export default function CartSummarySkeleton() {
  return (
    <div className="min-w-2xs space-y-4 border p-4 rounded-lg">
      <Skeleton className="h-4 w-32" />

      <div className="space-y-2">
        <div className="flex flex-row justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-8" />
        </div>

        <div className="flex flex-row justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="flex flex-row justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <Skeleton className="h-2" />

      <div className="flex flex-row justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-40" />
      </div>

      <Skeleton className="h-8" />
    </div>
  );
}
