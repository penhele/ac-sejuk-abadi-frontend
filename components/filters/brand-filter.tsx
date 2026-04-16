"use client";

import { Brand } from "@/types/brand";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BrandFilter({ brands }: { brands: Brand[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedBrands = searchParams.get("id_brand")?.split(",") || [];

  const handleFilterChange = (brandId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    let newSelected = [...selectedBrands];

    if (checked) {
      newSelected.push(brandId);
    } else {
      newSelected = newSelected.filter((id) => id !== brandId);
    }

    if (newSelected.length > 0) {
      params.set("id_brand", newSelected.join(","));
    } else {
      params.delete("id_brand");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("id_brand");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-sm">Brands</h1>
        <span
          className="text-xs text-gray-400 cursor-pointer transition-colors hover:text-primary"
          onClick={() => handleReset()}
        >
          Reset
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="group flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id.toString())}
                onCheckedChange={(checked) =>
                  handleFilterChange(brand.id.toString(), checked as boolean)
                }
              />
              <Label
                htmlFor={`brand-${brand.id}`}
                className="text-xs cursor-pointer"
              >
                {brand.name}
              </Label>
            </div>
            <span className="text-gray-400 text-xs group-hover:text-primary">
              {brand._count.products}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
