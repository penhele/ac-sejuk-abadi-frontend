import { useRouter } from "next/navigation";
import ProjectForm from "./project-form";
import { ROUTES } from "@/constants/routes";
import {
  getProjectByIdQueryOptions,
  getProjectsQueryOptions,
} from "@/hooks/queries/project-queries";
import { addProject } from "@/services/project.service";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function EditProjectForm({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: products, isFetching } = useQuery(
    getProjectByIdQueryOptions(id),
  );

  const { mutateAsync } = useMutation({
    mutationFn: addProject,
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Berhasil menambahkan project");
      router.push(ROUTES.DASHBOARD_PORTOFOLIO);
      queryClient.invalidateQueries({
        queryKey: getProjectsQueryOptions().queryKey,
      });
    },
    onError(error, variables, onMutateResult, context) {
      toast.error("Gagal menambahkan project");
      console.log(error.message);
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
