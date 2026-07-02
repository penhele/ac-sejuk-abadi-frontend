"use client";

import { ROUTES } from "@/constants/routes";
import { addProject, projectKeys } from "@/features/project";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import ProjectForm from "./project-form";

export default function CreateProjectForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addProject,
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
        goeyToast.promise(mutateAsync(value), {
          loading: "Creating...",
          success: () => {
            router.push(ROUTES.DASHBOARD_PROJECT);
            queryClient.invalidateQueries({
              queryKey: projectKeys.all,
            });

            return "Berhasil menambahkan project";
          },
          error: (err) => (err as AppError).message,
        });
      }}
      loading={isPending}
    />
  );
}
