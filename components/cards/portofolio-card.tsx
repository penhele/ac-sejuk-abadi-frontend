import { PortfolioProps } from "@/types/portofolio";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DescriptionCard, TitleCard } from "../util/card-content";

export default function PortofolioCard({
  portofolio,
}: {
  portofolio: PortfolioProps;
}) {
  return (
    <Link
      href={`/portofolio/${portofolio.id}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border"
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={portofolio.image!}
            alt={portofolio.title}
            fill
            className="object-cover"
          />
        </AspectRatio>

        <div className="absolute top-4 left-4">
          <span className="text-xs text-primary bg-white border rounded-lg py-1 px-2 font-semibold">
            {portofolio.category}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <TitleCard title={portofolio.title} />

        <DescriptionCard description={portofolio.description} />

        <div className="flex items-center gap-2 text-primary text-sm font-semibold">
          <span>Lihat Detail</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
