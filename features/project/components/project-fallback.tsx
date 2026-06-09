import { Skeleton } from "../../../components/ui/skeleton";

export default function ProjectFallback() {
  return (
    <div className="grid grid-cols-3 gap-between-card">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="aspect-video" />

          <div className="p-4 space-y-2">
            <Skeleton className="w-24 h-8" />
            <Skeleton className="w-56 h-8" />

            <div className="flex gap-2 items-center">
              <Skeleton className="w-8 h-4" />
              <Skeleton className="w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
