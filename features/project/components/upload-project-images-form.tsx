"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadProjectImage } from "../api/upload-project-images";
import { UploadProjectImagePayload } from "../types/upload-project-image-payload";
import { projectKeys } from "../queries/project-keys";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function UploadProjectImageForm({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UploadProjectImagePayload) => {
      return uploadProjectImage(id, data);
    },
    onMutate(variables, context) {
      const toastId = toast.loading("Uploading...");
      return { toastId };
    },
    onSuccess(data, variables, onMutateResult, context) {
      toast.dismiss(onMutateResult?.toastId);
      toast.success("Berhasil");

      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      router.push(ROUTES.DASHBOARD_GALLERY_PROJECT);
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error.message);
      toast.dismiss(onMutateResult?.toastId);
      toast.error("Gagal");
    },
  });

  const form = useAppForm({
    defaultValues: {
      files: [] as File[],
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
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
