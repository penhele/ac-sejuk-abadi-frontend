"use client";

import useProductFilters from "@/hooks/use-product-filters";
import { getBrands } from "@/services/brand.service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import getBrandsQueryOptions from "@/hooks/queries/brand-queries";

export default function BrandFilter() {
  const { id_brand, setFilters } = useProductFilters();

  const { data: brands } = useQuery(getBrandsQueryOptions());

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setFilters({ id_brand: brandId });
    } else {
      setFilters({ id_brand: undefined });
    }
  };

  const resetBrand = () => {
    setFilters({ id_brand: undefined });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center h-4">
        <span className="font-medium text-sm">Brands</span>

        {id_brand && (
          <Button
            className=""
            variant={"ghost"}
            size={"xs"}
            onClick={resetBrand}
          >
            Reset
          </Button>
        )}
      </div>

      {brands?.length != 0 ? (
        <FieldGroup className="gap-2">
          {brands?.map((brand) => {
            const isChecked = id_brand === brand.id.toString();

            return (
              <Field
                key={brand.id}
                orientation={"horizontal"}
                className="flex justify-between"
              >
                <div className="flex gap-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand.id.toString(), checked as boolean)
                    }
                  />
                  <FieldLabel
                    htmlFor={`brand-${brand.id}`}
                    className="font-normal text-xs "
                  >
                    {brand.name}
                  </FieldLabel>
                </div>

                <span className="text-xs">{brand._count.products}</span>
              </Field>
            );
          })}
        </FieldGroup>
      ) : (
        <span>Tidak ada brands</span>
      )}
    </div>
  );
}
