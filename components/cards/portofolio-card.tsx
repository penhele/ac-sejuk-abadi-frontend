import { PortfolioProps } from "@/types/portofolio";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";

export default function PortofolioCard({
  portofolio,
}: {
  portofolio: PortfolioProps;
}) {
  return (
    <div
      key={portofolio.id}
      className="border shadow-lg rounded-lg transition hover:scale-102"
    >
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg" />

      <div className="p-4 space-y-2">
        <h1 className="text-header-h3 font-bold uppercase">
          {portofolio.title}
        </h1>

        <p className="text-sm line-clamp-3 h-16 text-gray-600">
          {portofolio.description}
        </p>

        <Link
          href={`/portofolio/${portofolio.id}`}
          className="text-sm text-primary"
        >
          Lihat Detail &gt;
        </Link>
      </div>
    </div>
  );
}
