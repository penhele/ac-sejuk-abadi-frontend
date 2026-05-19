"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "../ui/accordion";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { useQuery } from "@tanstack/react-query";
import { getAcTypesQueryOptions } from "@/hooks/queries/ac-type-queries";
import { Checkbox } from "../ui/checkbox";
import useProductFilters from "@/hooks/use-product-filters";

export default function TypeFilter() {
  const { id_ac_type, setFilters } = useProductFilters();

  const { data: AcTypes } = useQuery(getAcTypesQueryOptions);

  const handleAcTypeChange = (acTypeId: string, checked: boolean) => {
    if (checked) {
      setFilters({ id_ac_type: acTypeId });
    } else {
      setFilters({ id_ac_type: undefined });
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue="type">
      <AccordionItem value="type">
        <AccordionTrigger>Tipe</AccordionTrigger>
        <AccordionContent>
          <FieldGroup className="gap-2">
            {AcTypes?.map((acType) => {
              const isChecked = id_ac_type === acType.id.toString();

              return (
                <Field
                  key={acType.id}
                  orientation={"horizontal"}
                  className="flex justify-between"
                >
                  <div className="flex gap-2">
                    <Checkbox
                      id={`brand-${acType.id}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleAcTypeChange(
                          acType.id.toString(),
                          checked as boolean,
                        )
                      }
                    />
                    <FieldLabel
                      htmlFor={`brand-${acType.id}`}
                      className="font-normal text-xs "
                    >
                      {acType.name}
                    </FieldLabel>
                  </div>

                  <span className="text-xs">{acType._count.products}</span>
                </Field>
              );
            })}
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
