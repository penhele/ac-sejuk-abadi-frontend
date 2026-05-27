import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { Button } from "../../ui/button";
import {
  createProjectSchema,
  ProjectFormValues,
} from "@/schemas/project.schema";
import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/react-form";
import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { useQuery } from "@tanstack/react-query";

export default function ProjectForm({
  defaultValues,
  onSubmit,
  submitLabel = "Submit",
  isFetching,
}: {
  defaultValues: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => void;
  submitLabel?: string;
  isFetching?: boolean;
}) {
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
      console.log(value);
      await onSubmit(value);
    },
  });

  const { data: products } = useQuery(getProductsQueryOptions());
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
        className="space-y-between-items-lg"
      >
        <div className="grid grid-cols-2 gap-between-items-lg">
          <form.AppField name="name">
            {(field) => (
              <field.TextField
                isDisabled={isFetching}
                label="Name"
                placeholder="Office Renovation Central Jakarta"
              />
            )}
          </form.AppField>

          <form.AppField name="location">
            {(field) => (
              <field.TextField
                isDisabled={isFetching}
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
              <field.TextareaField
                isDisabled={isFetching}
                className="col-span-2"
                label="Description"
                placeholder="Describe the project detail, scope of work, or installation notes..."
              />
            )}
          </form.AppField>

          <form.AppField name="id_products">
            {(field) => (
              // <field.SelectField
              //   disabled={isFetching}
              //   options={productOptions}
              //   className="col-span-2"
              //   label="Product"
              //   placeholder="Choose the product used"
              // />

              <field.ComboboxField
                label="Products"
                className="col-span-2"
                items={productOptions}
              />
            )}
          </form.AppField>
        </div>

        <div className="flex flex-row gap-between-items">
          <Link href={ROUTES.DASHBOARD_PORTOFOLIO}>
            <Button variant={"outline"} disabled={isFetching}>
              Cancel
            </Button>
          </Link>
          <form.SubmitButton label={submitLabel} isDisabled={isFetching} />
        </div>
      </form>
    </form.AppForm>
  );
}
