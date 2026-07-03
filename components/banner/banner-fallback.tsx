import { Skeleton } from "../ui/skeleton";

export default function BannerFallback() {
  return (
    <div className="relative aspect-video xs:aspect-2/1 lg:aspect-3/1">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
