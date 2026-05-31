"use client";

import { ROUTES } from "@/constants/routes";
import { addProject, projectKeys } from "@/features/project";
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
      router.push(ROUTES.DASHBOARD_PROJECT);
      queryClient.invalidateQueries({
        queryKey: projectKeys.all,
      });
    },
    onError(_, __, context) {
      toast.error("Gagal menambahkan project", { id: context?.toastId });
    },
  });

  return (
    <ProjectForm
      defaultValues={{
        name: "",
        category: "",
        date: "",
        description: "",
        location: "",
        id_products: [],
      }}
      onSubmit={async (value) => {
        await mutateAsync(value);
      }}
    />
  );
}
