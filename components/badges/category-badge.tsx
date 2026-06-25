import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const fallbackColors = [
  "bg-green-100 text-green-700 hover:bg-green-100 border-green-200/50",
  "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200/50",
  "bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200/50",
  "bg-red-100 text-red-700 hover:bg-red-100 border-red-200/50",
  "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200/50",
  "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200/50",
  "bg-teal-100 text-teal-700 hover:bg-teal-100 border-teal-200/50",
  "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200/50",
  "bg-cyan-100 text-cyan-700 hover:bg-cyan-100 border-cyan-200/50",
  "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200/50",
];

function getCategoryColor(categoryName: string): string {
  const normalized = categoryName.toLowerCase().trim();

  if (normalized === "inverter") {
    return "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200/50";
  }
  if (normalized === "standar") {
    return "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200/50";
  }

  // Hash-based dynamic color for other categories
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % fallbackColors.length;
  return fallbackColors[index];
}

export default function CategoryBadge({
  category,
}: {
  category: string | undefined;
}) {
  const colorClass = category ? getCategoryColor(category) : "";

  return (
    <Badge
      variant={!category ? "outline" : "default"}
      className={cn(colorClass)}
    >
      {category ?? "Not Spesified"}
    </Badge>
  );
}
