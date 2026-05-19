import Image from "next/image";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export default function FooterProfile({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-between-items-xs", className)}>
      <div className="relative h-16 w-32">
        <Image src={"/logo.png"} alt="" fill className="object-contain" />
      </div>

      <Separator />

      <p className="text-sm leading-relaxed text-gray-600">
        Penyedia solusi pendingin udara (AC) terbaik dengan pengalaman lebih
        dari 10 tahun. Kami berkomitmen memberikan kenyamanan udara untuk setiap
        ruangan Anda.
      </p>
    </div>
  );
}
