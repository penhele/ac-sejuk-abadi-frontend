import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function CategoryBadge({ category }: { category: string }) {
  return (
    <Badge
      className={cn(
        category.toLowerCase() === "inverter" &&
          "bg-blue-100 text-blue-700 hover:bg-blue-100",
        category.toLowerCase() === "standar" &&
          "bg-orange-100 text-orange-700 hover:bg-orange-100",
      )}
    >
      {category}
    </Badge>
  );
}
