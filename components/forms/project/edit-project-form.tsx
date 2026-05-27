import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import {
  getProjectByIdQueryOptions,
  getProjectsQueryOptions,
} from "@/hooks/queries/project-queries";
import { addProject } from "@/services/project.service";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ProjectForm from "./project-form";

export default function EditProjectForm({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: projects, isFetching } = useQuery(
    getProjectByIdQueryOptions(id),
  );

  const { mutateAsync } = useMutation({
    mutationFn: addProject,
    onMutate() {
      const toastId = toast.loading("Updating...");
      return { toastId };
    },
    onSuccess(_, __, context) {
      toast.success("Berhasil menambahkan project", { id: context.toastId });
      router.push(ROUTES.DASHBOARD_PROJECT);
      queryClient.invalidateQueries({
        queryKey: getProjectsQueryOptions().queryKey,
      });
    },
    onError(_, __, context) {
      toast.error("Gagal menambahkan project", {
        id: context?.toastId,
      });
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
        id_products: projects?.products.map((item) => item.product.id) || [],
      }}
      onSubmit={async (value) => {
        await mutateAsync(value);
      }}
    />
  );
}
