import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: number;
  description: string;
  className?: string;
  Icon: LucideIcon;
};

export default function StatsCard({
  label,
  value,
  description,
  className,
  Icon,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between border p-8 rounded-2xl transition hover:shadow-lg bg-muted/40",
        className,
      )}
    >
      <Badge variant={"outline"} className="space-x-between-items-xs">
        <Icon className="text-primary" />
        {label}
      </Badge>

      <div className="space-y-between-items-xs">
        <h1 className="text-3xl font-bold ">{value}+</h1>
        <span className="font-light text-gray-800 tesm">{description}</span>
      </div>
    </div>
  );
}
