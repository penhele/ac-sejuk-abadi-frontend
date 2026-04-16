import { SponsoredBrand } from "@/types/brand";
import Link from "next/link";

export default function SponsoredBrandList({
  sponsoredBrand,
  title,
}: {
  sponsoredBrand: SponsoredBrand[];
  title: string;
}) {
  return (
    <div className="space-y-4">
      <h1 className="font-semibold uppercase text-xs tracking-widest">
        {title}
      </h1>

      <ul className="space-y-2">
        {sponsoredBrand.map((item) => (
          <li key={item.brand.id}>
            <Link href={""} className="block text-sm">
              {item.brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
