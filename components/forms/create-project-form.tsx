"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { addProject } from "@/services/project.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ROUTES } from "@/constants/routes";
import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { useRouter } from "next/navigation";

export default function CreateProjectForm() {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: addProject,
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Berhasil menambahkan project");
      router.push(ROUTES.DASHBOARD_PORTOFOLIO);
    },
    onError(error, variables, onMutateResult, context) {
      toast.error("Gagal menambahkan project");
      console.log(error.message);
    },
  });

  const form = useAppForm({
    defaultValues: {
      id_product: "",
      name: "",
      description: "",
      date: "",
      location: "",
      category: "",
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  const { data: products } = useQuery(getProductsQueryOptions());
  const productOptions =
    products?.data?.map((product) => ({
      label: product.name,
      value: product.id.toString(),
    })) ?? [];

  return (
    <form.AppForm>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
        className="space-y-between-items-lg"
      >
        <div className="grid grid-cols-2 gap-between-items-lg">
          <form.AppField name="name">
            {(field) => (
              <field.TextField
                label="Name"
                placeholder="Office Renovation Central Jakarta"
              />
            )}
          </form.AppField>

          <form.AppField name="location">
            {(field) => (
              <field.TextField
                label="Location"
                placeholder="Semarang, Indonesia"
              />
            )}
          </form.AppField>

          <form.AppField name="date">
            {(field) => (
              <field.CalendarField
                label="Date"
                placeholder="Select project date"
              />
            )}
          </form.AppField>

          <form.AppField name="category">
            {(field) => (
              <field.SelectField
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

          <form.AppField name="id_product">
            {(field) => (
              <field.SelectField
                options={productOptions}
                className="col-span-2"
                label="Product"
                placeholder="Choose the product used"
              />
            )}
          </form.AppField>

          <form.AppField name="description">
            {(field) => (
              <field.TextareaField
                className="col-span-2"
                label="Description"
                placeholder="Describe the project detail, scope of work, or installation notes..."
              />
            )}
          </form.AppField>
        </div>

        <div className="flex flex-row gap-between-items">
          <Link href={ROUTES.DASHBOARD_PORTOFOLIO}>
            <Button variant={"outline"}>Cancel</Button>
          </Link>
          <form.SubmitButton label="Submit" />
        </div>
      </form>
    </form.AppForm>
  );
}
