"use client";

import { ROUTES } from "@/constants/routes";
import { useAppForm } from "@/hooks/use-app-form";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import { uploadProjectImage } from "../api/upload-project-images";
import { projectKeys } from "../queries/project-keys";
import { UploadProjectImagePayload } from "../types/upload-project-image-payload";

export default function UploadProjectImageForm({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UploadProjectImagePayload) =>
      uploadProjectImage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });

  const form = useAppForm({
    defaultValues: {
      files: [] as File[],
    },
    onSubmit: ({ value }) => {
      goeyToast.promise(mutateAsync(value), {
        loading: "Uploading...",
        success: "Berhasil",
        error: (err) => (err as AppError).message,
      });
    },
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
