import { Badge } from "../../../components/ui/badge";

import { tv } from "tailwind-variants";

export const acTypeBadge = tv({
  variants: {
    type: {
      splitWall: "bg-red-100 text-red-700 hover:bg-red-100",
      cassette: "bg-purple-100 text-purple-700 hover:bg-purple-100",
      floorStanding: "bg-orange-100 text-orange-700 hover:bg-orange-100",
      portable: "bg-green-100 text-green-700 hover:bg-green-100",
      splitDuct: "bg-pink-100 text-pink-700 hover:bg-pink-100",
      multiS: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    },
  },
});

const acTypeVariantMap = {
  "ac split wall": "splitWall",
  "ac cassette": "cassette",
  "ac floor standing": "floorStanding",
  "ac portable": "portable",
  "ac split duct": "splitDuct",
  "ac multi-s": "multiS",
} as const;

export default function AcProductTypeBadge({ acType }: { acType?: string }) {
  const variant = acType
    ? acTypeVariantMap[acType.toLowerCase() as keyof typeof acTypeVariantMap]
    : undefined;

  return (
    <Badge
      variant={!acType ? "outline" : "default"}
      className={acTypeBadge({ type: variant })}
    >
      {acType ?? "Not Specified"}
    </Badge>
  );
}
