import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function ArticleContentSkeleton({ className }: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className="w-80 h-8" />

      <div className="space-y-1">
        <Skeleton className="w-40 h-4" />
        <Skeleton className="w-40 h-4" />
      </div>

      <Skeleton className="w-full h-1" />

      <Skeleton className="aspect-video" />

      <div className="space-y-2">
        <Skeleton className="w-60 h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}
