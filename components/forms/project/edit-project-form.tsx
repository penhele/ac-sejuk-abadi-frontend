import { ROUTES } from "@/constants/routes";
import {
  projectKeys,
  UpdateProjectPayload,
  useProject,
} from "@/features/project";
import { updateProject } from "@/features/project/api/update-project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProjectForm from "./project-form";

export default function EditProjectForm({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: projects, isFetching } = useProject(id);

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateProjectPayload) => updateProject(id, data),
    onMutate() {
      const toastId = toast.loading("Updating...");
      return { toastId };
    },
    onSuccess(_, __, context) {
      toast.success("Berhasil update project", { id: context.toastId });
      router.push(ROUTES.DASHBOARD_PROJECT);
      queryClient.invalidateQueries({
        queryKey: projectKeys.all,
      });
    },

    onError(error, __, context) {
      toast.error("Gagal update project", {
        id: context?.toastId,
      });
      console.log(error.message);
    },
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
        id_products: projects?.products.map((item) => item.product.name) || [],
      }}
      onSubmit={async (value) => {
        await mutateAsync(value);
      }}
    />
  );
}
