"use client";

import { ROUTES } from "@/constants/routes";
import { useProducts } from "@/features/product";
import {
  createProjectSchema,
  ProjectFormValues,
} from "@/features/project/schemas/project.schema";
import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/react-form";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { MapPin } from "lucide-react";

interface Props {
  defaultValues: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => void;
  submitLabel?: string;
  isFetching?: boolean;
  loading?: boolean;
}

export default function ProjectForm({
  defaultValues,
  onSubmit,
  submitLabel = "Submit",
  isFetching,
  loading,
}: Props) {
  const [productSearch, setProductSearch] = useState("");

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: createProjectSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const { data: products } = useProducts({ search: productSearch });

  const productOptions =
    products?.data?.map((product) => ({
      name: product.name,
      id: product.id.toString(),
    })) ?? [];

  return (
    <form.AppForm>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
        className="space-y-between-field"
      >
        <div className="grid grid-cols-2 gap-between-items-lg">
          <form.AppField name="name">
            {(field) => (
              <field.InputField
                isDisabled={isFetching}
                label="Name"
                placeholder="Office Renovation Central Jakarta"
              />
            )}
          </form.AppField>

          <form.AppField name="location">
            {(field) => (
              <field.InputField
                isDisabled={isFetching}
                label="Location"
                placeholder="Semarang, Indonesia"
                IconAddon={MapPin}
              />
            )}
          </form.AppField>

          <form.AppField name="date">
            {(field) => (
              <field.CalendarField
                label="Date"
                placeholder="Select project date"
                isDisabled={isFetching}
              />
            )}
          </form.AppField>

          <form.AppField name="category">
            {(field) => (
              <field.SelectField
                disabled={isFetching}
                options={[
                  { label: "Interior", value: "Interior" },
                  { label: "Exterior", value: "Exterior" },
                  { label: "Furniture", value: "Furniture" },
                ]}
                label="Category"
                placeholder="Select a category"
              />
            )}
          </form.AppField>

          <form.AppField name="description">
            {(field) => (
              <field.InputField
                isDisabled={isFetching}
                className="col-span-2"
                label="Description"
                placeholder="Describe the project detail, scope of work, or installation notes..."
                isTextarea
              />
            )}
          </form.AppField>

          <form.AppField name="id_products">
            {(field) => (
              <field.ComboboxField
                label="Products"
                className="col-span-2"
                items={productOptions}
                initialSearchValue={productSearch}
                onDebouncedSearchChange={(value) => setProductSearch(value)}
              />
            )}
          </form.AppField>
        </div>

        <div className="flex flex-row gap-between-items">
          <Link href={ROUTES.DASHBOARD_PROJECT}>
            <Button variant={"outline"} disabled={isFetching}>
              Cancel
            </Button>
          </Link>

          <form.SubmitButton label={submitLabel} loading={loading} />
        </div>
      </form>
    </form.AppForm>
  );
}
