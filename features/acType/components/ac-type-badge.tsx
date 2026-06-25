import { Badge } from "../../../components/ui/badge";
import { cn } from "@/lib/utils";

const fallbackColors = [
  "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200/50",
  "bg-green-100 text-green-700 hover:bg-green-100 border-green-200/50",
  "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200/50",
  "bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200/50",
  "bg-red-100 text-red-700 hover:bg-red-100 border-red-200/50",
  "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200/50",
  "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200/50",
  "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200/50",
  "bg-teal-100 text-teal-700 hover:bg-teal-100 border-teal-200/50",
  "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200/50",
  "bg-cyan-100 text-cyan-700 hover:bg-cyan-100 border-cyan-200/50",
  "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200/50",
];

const acTypeSpecificMap: Record<string, string> = {
  "ac split wall": "bg-red-100 text-red-700 hover:bg-red-100 border-red-200/50",
  "ac cassette":
    "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200/50",
  "ac floor standing":
    "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200/50",
  "ac portable":
    "bg-green-100 text-green-700 hover:bg-green-100 border-green-200/50",
  "ac split duct":
    "bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200/50",
  "ac multi-s":
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200/50",
};

function getAcTypeColor(acTypeName: string): string {
  const normalized = acTypeName.toLowerCase().trim();

  if (acTypeSpecificMap[normalized]) {
    return acTypeSpecificMap[normalized];
  }

  // Hash-based dynamic color for other types
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % fallbackColors.length;
  return fallbackColors[index];
}

export default function AcProductTypeBadge({ acType }: { acType?: string }) {
  const colorClass = acType ? getAcTypeColor(acType) : "";

  return (
    <Badge variant={!acType ? "outline" : "default"} className={cn(colorClass)}>
      {acType ?? "Not Specified"}
    </Badge>
  );
}
