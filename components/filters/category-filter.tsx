"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import useProductFilters from "@/hooks/use-product-filters";

export default function CategoryFilter() {
  const { data: categories } = useQuery(getCategoriesQueryOptions());

  const { id_category, setFilters } = useProductFilters();

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setFilters({ id_category: categoryId });
    } else {
      setFilters({ id_category: undefined });
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue="category">
      <AccordionItem value="category">
        <AccordionTrigger>Kategori</AccordionTrigger>
        <AccordionContent>
          <FieldGroup className="gap-2">
            {categories?.map((category) => {
              const isChecked = id_category === category.id.toString();

              return (
                <Field
                  key={category.id}
                  orientation={"horizontal"}
                  className="flex justify-between"
                >
                  <div className="flex gap-2">
                    <Checkbox
                      id={`brand-${category.id}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(
                          category.id.toString(),
                          checked as boolean,
                        )
                      }
                    />
                    <FieldLabel
                      htmlFor={`brand-${category.id}`}
                      className="font-normal text-xs "
                    >
                      {category.name}
                    </FieldLabel>
                  </div>

                  <span className="text-xs">{category._count.products}</span>
                </Field>
              );
            })}
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
