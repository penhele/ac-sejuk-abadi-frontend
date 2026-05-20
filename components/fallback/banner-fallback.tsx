import { ImageOff } from "lucide-react";
import EmptyState from "../empty-state/empty-state";
import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

export default function BannerFallback() {
  return (
    <AspectRatio ratio={3 / 1} className="relative">
      <Skeleton className="w-full h-full" />

      <EmptyState
        Icon={ImageOff}
        label="No images found"
        className="absolute inset-0 flex items-center justify-center"
      />
    </AspectRatio>
  );
}
