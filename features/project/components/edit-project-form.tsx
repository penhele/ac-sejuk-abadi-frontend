import { ROUTES } from "@/constants/routes";
import {
  projectKeys,
  UpdateProjectPayload,
  useProject,
} from "@/features/project";
import { updateProject } from "@/features/project/api/update-project";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import ProjectForm from "./project-form";

export default function EditProjectForm({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: projects, isFetching } = useProject(id);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateProjectPayload) => updateProject(id, data),
  });

  return (
    <ProjectForm
      isFetching={isFetching}
      defaultValues={{
        name: projects?.name || "",
        description: projects?.description || "",
        date: projects?.date || "",
        location: projects?.location || "",
        category: projects?.category || "",
        id_products: projects?.products.map((item) => item.product.id) || [],
      }}
      onSubmit={async (value) => {
        goeyToast.promise(mutateAsync(value), {
          loading: "Updating...",
          success: () => {
            router.push(ROUTES.DASHBOARD_PROJECT);
            queryClient.invalidateQueries({
              queryKey: projectKeys.all,
            });

            return "Berhasil update project";
          },
          error: (err) => (err as AppError).message,
        });
      }}
      loading={isPending}
    />
  );
}
