"use client";

import CancelButton from "@/components/buttons/cancel-button";
import { uploadProductImages } from "@/features/product";
import { productKeys } from "@/features/product";
import { useAppForm } from "@/hooks/use-app-form";
import { uploadProductImageSchema } from "@/features/product/schemas/product.schema";
import { revalidateLogic } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UploadImagePayload } from "@/features/product/types/upload-image-payload";

export default function UploadProductImageForm({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UploadImagePayload) => uploadProductImages(id, data),
    onMutate(variables, context) {
      const toastId = toast.loading("Loading...");
      return { toastId };
    },
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Berhasil menambahkan gambar", {
        id: onMutateResult.toastId,
      });
      form.reset();
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
    onError(error, variables, onMutateResult, context) {
      toast.error("Gagal menambahkan gambar", { id: onMutateResult?.toastId });
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
