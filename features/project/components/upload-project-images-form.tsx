"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { uploadProjectImage } from "../api/upload-project-images";
import { projectKeys } from "../queries/project-keys";
import { UploadProjectImagePayload } from "../types/upload-project-image-payload";

interface Props {
  id: string;
}

export default function UploadProjectImageForm({ id }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UploadProjectImagePayload) =>
      uploadProjectImage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      form.reset();
    },
  });

  const handleSubmit = ({ value }: { value: UploadProjectImagePayload }) => {
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

        <form.SubmitButton label="Save" />
      </form>
    </form.AppForm>
  );
}
