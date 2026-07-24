import { formatRupiah } from "@/lib/format/currency";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number | undefined;
  className?: string;
  isPrice?: boolean;
}

export default function InfoField({ label, value, className, isPrice }: Props) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="font-medium">
        {isPrice ? formatRupiah(Number(value)) : (value ?? "-")}
      </p>
    </div>
  );
}
