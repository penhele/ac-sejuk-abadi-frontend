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

  const { data: products, isFetching } = useQuery(
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
      router.push(ROUTES.DASHBOARD_PORTOFOLIO);
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
        name: products?.name || "",
        description: products?.description || "",
        date: products?.date || "",
        location: products?.location || "",
        category: products?.category || "",
        id_product: products?.id_product || "",
      }}
      onSubmit={async (value) => {
        await mutateAsync(value);
      }}
    />
  );
}
