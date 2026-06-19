import { Badge } from "../ui/badge";
import { tv } from "tailwind-variants";

const categoryBadge = tv({
  variants: {
    category: {
      inverter: "bg-blue-100 text-blue-700 hover:bg-blue-100",
      standar: "bg-orange-100 text-orange-700 hover:bg-orange-100",
    },
  },
});

const categoryVariantMap = {
  inverter: "inverter",
  standar: "standar",
} as const;

export default function CategoryBadge({
  category,
}: {
  category: string | undefined;
}) {
  const variant = category
    ? categoryVariantMap[
        category.toLowerCase() as keyof typeof categoryVariantMap
      ]
    : undefined;

  return (
    <Badge
      variant={!category ? "outline" : "default"}
      className={categoryBadge({ category: variant })}
    >
      {category ?? "Not Spesified"}
    </Badge>
  );
}
