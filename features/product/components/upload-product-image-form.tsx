"use client";

import CancelButton from "@/components/buttons/cancel-button";
import { productKeys, uploadProductImages } from "@/features/product";
import { uploadProductImageSchema } from "@/features/product/schemas/product.schema";
import { UploadImagePayload } from "@/features/product/types/upload-image-payload";
import { useAppForm } from "@/hooks/use-app-form";
import { AppError } from "@/types/error";
import { revalidateLogic } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";

export default function UploadProductImageForm({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UploadImagePayload) => uploadProductImages(id, data),
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
    onSubmit: ({ value }) => {
      goeyToast.promise(mutateAsync(value), {
        loading: "Loading...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: productKeys.all,
          });

          return "Berhasil";
        },
        error: (err) => (err as AppError).message,
      });
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col space-y-between-items"
      >
        <div className="flex flex-row justify-between space-x-between-items-xs">
          <CancelButton
            onCancel={form.reset}
            onCloseEdit={() => ({})}
            className="flex-1"
          />
          <form.SubmitButton label="Submit" className="flex-1" />
        </div>

        <form.AppField name="files">
          {(field) => <field.ImageField />}
        </form.AppField>
      </form>
    </form.AppForm>
  );
}
