"use client";

import { Brand } from "@/types/brand";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";

export default function BrandFilter({ brands }: { brands: Brand[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">Brands</span>
        <Button className="" variant={"ghost"} size={"xs"}>
          Reset
        </Button>
      </div>

      <FieldGroup className="gap-2">
        {brands.map((brand) => (
          <Field orientation={"horizontal"}>
            <Checkbox />
            <FieldLabel className="font-normal text-xs">
              {brand.name}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
}
