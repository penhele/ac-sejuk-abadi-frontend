import { cn } from "@/lib/utils";
import Maps from "../maps/maps";

export default function FooterMap({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-between-items-sm", className)}>
      <h1 className="font-semibold text-xs tracking-widest uppercase">
        Lokasi kami
      </h1>

      <Maps className="w-full rounded-lg h-20 sm:h-56" />
    </div>
  );
}
