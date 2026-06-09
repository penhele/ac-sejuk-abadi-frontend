"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadProjectImage } from "../api/upload-project-images";
import { UploadProjectImagePayload } from "../types/upload-project-image-payload";
import { useProjects } from "../hooks/use-projects";

export default function UploadProjectImageForm() {
  const { mutateAsync } = useMutation({
    mutationFn: (data: UploadProjectImagePayload) => {
      return uploadProjectImage(data.projectId, data);
    },
    onMutate(variables, context) {
      const toastId = toast.loading("Uploading...");
      return { toastId };
    },
    onSuccess(data, variables, onMutateResult, context) {
      toast.dismiss(onMutateResult?.toastId);
      toast.success("Berhasil");
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error.message);
      toast.dismiss(onMutateResult?.toastId);
      toast.error("Gagal");
    },
  });

  const form = useAppForm({
    defaultValues: {
      projectId: "",
      files: [] as File[],
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  const { data: projects } = useProjects();
  const projectOptions =
    projects?.map((project) => ({
      label: project.name,
      value: project.id.toString(),
    })) ?? [];

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
        className="space-y-between-items"
      >
        <form.AppField name="projectId">
          {(field) => (
            <field.SelectField options={projectOptions} label="ID Project" />
          )}
        </form.AppField>

        <form.AppField name="files">
          {(field) => <field.ImageField label="Images" />}
        </form.AppField>

        <form.SubmitButton label="Save" />
      </form>
    </form.AppForm>
  );
}
