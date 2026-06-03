"use client";

import { useBrands } from "@/features/brand/hooks/use-brands";
import useProductFilters from "@/hooks/use-product-filters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";

export default function BrandFilter() {
  const { id_brand, setFilters } = useProductFilters();

  const { data: brands } = useBrands();

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setFilters({ id_brand: brandId });
    } else {
      setFilters({ id_brand: undefined });
    }
  };

  return (
    <div>
      {brands?.length != 0 ? (
        <Accordion type="single" collapsible defaultValue="brand">
          <AccordionItem value="brand">
            <AccordionTrigger>Brand</AccordionTrigger>
            <AccordionContent>
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
                            handleBrandChange(
                              brand.id.toString(),
                              checked as boolean,
                            )
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <span>Tidak ada brands</span>
      )}
    </div>
  );
}
