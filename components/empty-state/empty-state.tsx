import { Button } from "@/components/ui/button";
import { ROUTES } from "@/contants/routes";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function EmptyState({
  Icon,
  label,
  description,
  buttonLabel,
}: {
  Icon: LucideIcon;
  label: string;
  description?: string;
  buttonLabel?: string;
}) {
  return (
    <div className="space-y-2 flex flex-col items-center">
      <Icon size={64} className="text-gray-600" />

      <div className="space-y-1 flex flex-col items-center">
        <span className="text-lg text-gray-600 font-semibold">{label}</span>
        <span className="text-sm text-gray-400">{description}</span>
      </div>

      <Link href={ROUTES.SHOP}>
        <Button>{buttonLabel ?? "Browse Products"} </Button>
      </Link>
    </div>
  );
}
