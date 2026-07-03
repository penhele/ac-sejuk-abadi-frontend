import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { updateCategory } from "../api/update-category";
import useCategory from "../hooks/use-category";
import { categoryKeys } from "../queries/category-keys";
import { UpdateCategoryPayload } from "../types/update-category-payload";
import CategoryForm from "./category-form";

export default function EditCategoryForm({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { data: category, isLoading } = useCategory(id);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateCategoryPayload) => updateCategory(id, data),
  });

  return (
    <CategoryForm
      defaultValues={{
        name: category?.name ?? "",
      }}
      onSubmit={async (value) => {
        goeyToast.promise(mutateAsync(value), {
          loading: "Loading...",
          success: () => {
            queryClient.invalidateQueries({
              queryKey: categoryKeys.all,
            });
            return "Berhasil";
          },
          error: (err) => (err as AppError).message,
        });
      }}
      isLoading={isLoading || isPending}
    />
  );
}
