"use client";

import { ROUTES } from "@/constants/routes";
import { getProjectsQueryOptions } from "@/hooks/queries/project-queries";
import { addProject } from "@/services/project.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProjectForm from "./project-form";

export default function CreateProjectForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: addProject,
    onMutate() {
      const toastId = toast.loading("Creating...");
      return { toastId };
    },
    onSuccess(_, __, context) {
      toast.success("Berhasil menambahkan project", { id: context?.toastId });
      router.push(ROUTES.DASHBOARD_PORTOFOLIO);
      queryClient.invalidateQueries({
        queryKey: getProjectsQueryOptions().queryKey,
      });
    },
    onError(_, __, context) {
      toast.error("Gagal menambahkan project", { id: context?.toastId });
    },
  });

  return (
    <ProjectForm
      defaultValues={{
        id_product: "",
        name: "",
        category: "",
        date: "",
        description: "",
        location: "",
      }}
      onSubmit={async (value) => {
        await mutateAsync(value);
      }}
    />
  );
}
