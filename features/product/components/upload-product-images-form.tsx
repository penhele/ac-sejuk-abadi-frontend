"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProductImages } from "../api/upload-product-images";
import { productKeys } from "../queries/product-keys";
import { goeyToast } from "goey-toast";
import { AppError } from "@/types/error";
import { useAppForm } from "@/hooks/use-app-form";
import { UploadProductImagePayload } from "../types/upload-product-image-payload";

interface Props {
  id: string;
}

export default function UploadProductImagesForm({ id }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UploadProductImagePayload) =>
      uploadProductImages(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      form.reset();
    },
  });

  const handleSubmit = ({ value }: { value: UploadProductImagePayload }) => {
    goeyToast.promise(mutateAsync(value), {
      loading: "Uploading...",
      success: "Berhasil",
      error: (err) => (err as AppError).message,
    });
  };

  const form = useAppForm({
    defaultValues: {
      files: [] as File[],
    },
    onSubmit: handleSubmit,
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
        className="space-y-between-items"
      >
        <form.AppField name="files">
          {(field) => <field.ImageField label="Upload Images" />}
        </form.AppField>

        <form.SubmitButton label="Save" loading={isPending} />
      </form>
    </form.AppForm>
  );
}
