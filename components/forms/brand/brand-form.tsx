import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import { useAppForm } from "@/hooks/use-app-form";
import { BranFormValues, createBrandSchema } from "@/schemas/brand.schema";
import { revalidateLogic } from "@tanstack/react-form";

export default function BrandForm({
  defaultValues,
  onSubmit,
  isLoading
}: {
  defaultValues: BranFormValues;
  onSubmit: (values: BranFormValues) => void;
  isLoading?: boolean
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
      console.log("submit", value);
      await onSubmit(value);
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="h-full flex flex-col justify-between"
      >
        <div className="px-4">
          <form.AppField name="name">
            {(field) => <field.TextField label="Name" isDisabled={isLoading} />}
          </form.AppField>
        </div>

        <SheetFooter>
          <form.SubmitButton label="Save changes" />
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </form.AppForm>
  );
}
