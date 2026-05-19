"use client";

import { ROUTES } from "@/constants/routes";
import { getSponsoredBrandsQueryOptions } from "@/hooks/queries/brand-queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function FooterLinks({ className }: { className?: string }) {
  const { data: sposoredBrands } = useQuery(getSponsoredBrandsQueryOptions);

  const categoryList = [
    { name: "AC Split Wall", href: "/shop?category=split" },
    { name: "AC Cassette", href: "/shop?category=cassette" },
    { name: "AC Floor Standing", href: "/shop?category=floor" },
    { name: "AC Split Duct", href: "/shop?category=duct" },
    { name: "AC Inverter", href: "/shop?category=inverter" },
    { name: "AC Portable", href: "/shop?category=portable" },
  ];

  const quickLinks = [
    { name: "Tentang Kami", href: "/about-us" },
    { name: "Layanan Kami", href: "/services" },
    { name: "Proyek / Portofolio", href: ROUTES.PORTOFOLIO },
    { name: "Katalog Produk", href: ROUTES.SHOP },
    { name: "Hubungi Kami", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <div className={cn("grid grid-cols-3", className)}>
      <div className="space-y-between-items-sm">
        <h1 className="font-semibold uppercase text-xs tracking-widest">
          Brand
        </h1>

        <ul className="space-y-between-items-xs">
          {sposoredBrands?.map((brand) => (
            <li key={brand.id}>
              <Link href={""} className="block text-sm leading-relaxed">
                {brand.brand.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-between-items-sm">
        <h1 className="font-semibold uppercase text-xs tracking-widest">
          Category
        </h1>

        <ul className="space-y-between-items-xs">
          {categoryList.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="block text-sm leading-relaxed">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-between-items-sm">
        <h1 className="font-semibold uppercase text-xs tracking-widest">
          Quick Link
        </h1>

        <ul className="space-y-between-items-xs">
          {quickLinks.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="block text-sm leading-relaxed">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
