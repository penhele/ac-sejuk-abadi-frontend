import { PortfolioProps } from "@/types/portofolio";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function PortofolioCard({
  portofolio,
}: {
  portofolio: PortfolioProps;
}) {
  return (
    <Link
      href={`/portofolio/${portofolio.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border"
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          {portofolio.image ? (
            <Image
              src={portofolio.image}
              alt={portofolio.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
        </AspectRatio>
        {portofolio.category && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-primary rounded-full shadow-sm">
              {portofolio.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
          {portofolio.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed h-10">
          {portofolio.description}
        </p>

        <div className="flex items-center text-primary text-sm font-semibold pt-2">
          <span>Lihat Detail</span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
