import { Button } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { useAppForm } from "@/hooks/use-app-form";
import { revalidateLogic } from "@tanstack/react-form";
import { AcTypeFormValues, createAcTypeSchema } from "../schema/ac-type.schema";

export default function AcTypeForm({
  defaultValues,
  onSubmit,
  isLoading,
}: {
  defaultValues: AcTypeFormValues;
  onSubmit: (values: AcTypeFormValues) => void;
  isLoading?: boolean;
}) {
  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: createAcTypeSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    onSubmit: async ({ value }) => {
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
            {(field) => (
              <field.InputField label="Name" isDisabled={isLoading} />
            )}
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
