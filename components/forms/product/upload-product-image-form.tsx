"use client";

import CancelButton from "@/components/buttons/cancel-button";
import { ROUTES } from "@/constants/routes";
import { useAppForm } from "@/hooks/use-app-form";
import { uploadProductImageSchema } from "@/schemas/product.schema";
import { uploadImages } from "@/services/product.service";
import { UploadImagePayload } from "@/types/product";
import { revalidateLogic } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function UploadProductImageForm({ id }: { id: string }) {
  const { mutateAsync } = useMutation({
    mutationFn: (data: UploadImagePayload) => uploadImages(id, data),
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Berhasil menambahkan gambar");
    },
    onError(error, variables, onMutateResult, context) {
      toast.error("Gagal menambahkan gambar");
    },
  });

  const form = useAppForm({
    defaultValues: {
      files: [] as File[],
    },
    validators: {
      onSubmit: uploadProductImageSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-6"
      >
        <form.AppField name="files">
          {(field) => <field.ImageField />}
        </form.AppField>

        <div className="flex flex-row space-x-between-items-xs">
          <CancelButton
            onCancel={form.reset}
            onCloseEdit={() => ({})}
            className="min-w-24"
            href={ROUTES.PRODUCTS}
          />
          <form.SubmitButton label="Submit" className="min-w-24" />
        </div>
      </form>
    </form.AppForm>
  );
}
