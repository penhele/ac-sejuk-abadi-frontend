"use client";

import { ROUTES } from "@/constants/routes";
import { getSponsoredBrandsQueryOptions } from "@/hooks/queries/brand-queries";
import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function FooterLinks({ className }: { className?: string }) {
  const { data: responseSponsoredBrands } = useQuery(
    getSponsoredBrandsQueryOptions(),
  );

  const sposoredBrands = responseSponsoredBrands || [];

  const { data: responseCategories } = useQuery(getCategoriesQueryOptions());

  const categories = responseCategories || [];

  const quickLinks = [
    { name: "Home", href: ROUTES.HOME },
    { name: "Shop", href: ROUTES.SHOP },
    { name: "Portofolio", href: ROUTES.PORTOFOLIO },
    { name: "Edukasi", href: ROUTES.EDUCATION },
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
              <Link href={"#"} className="block text-sm leading-relaxed">
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
          {categories?.map((category) => (
            <li key={category.id}>
              <Link href="" className="block text-sm leading-relaxed">
                {category.name}
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
