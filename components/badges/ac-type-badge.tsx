import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const acTypeStyles: Record<string, string> = {
  "ac split wall": "bg-red-100 text-red-700 hover:bg-red-100",

  "ac cassette": "bg-purple-100 text-purple-700 hover:bg-purple-100",

  "ac floor standing": "bg-orange-100 text-orange-700 hover:bg-orange-100",

  "ac portable": "bg-green-100 text-green-700 hover:bg-green-100",

  "ac split duck": "bg-pink-100 text-pink-700 hover:bg-pink-100",
};

export default function AcProductTypeBadge({ acType }: { acType: string }) {
  return (
    <Badge className={cn(acTypeStyles[acType.toLowerCase()])}>{acType}</Badge>
  );
}
