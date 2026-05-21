import { useAppForm } from "@/hooks/use-app-form";
import { BranFormValues, createBrandSchema } from "@/schemas/brand.schema";
import { revalidateLogic } from "@tanstack/react-form";

export default function BrandForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: BranFormValues;
  onSubmit: (values: BranFormValues) => void;
}) {
  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: createBrandSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-between-items"
      >
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Nama Brand" />}
        />

        <form.SubmitButton label="Submit" />
      </form>
    </form.AppForm>
  );
}
