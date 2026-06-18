import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  className?: string;
};

export default function ArticleCardSkeleton({ className }: Props) {
  return (
    <div className="space-y-between-items-xs">
      <Skeleton className="aspect-video" />

      <Skeleton className="h-8 w-40" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
