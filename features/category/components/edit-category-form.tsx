import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCategory } from "../api/update-category";
import useCategory from "../hooks/use-category";
import { categoryKeys } from "../queries/category-keys";
import { UpdateCategoryPayload } from "../types/update-category-payload";
import CategoryForm from "./category-form";

export default function EditCategoryForm({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { data: category, isLoading } = useCategory(id);
  console.log(category);

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateCategoryPayload) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });

      toast.success("Category berhasil ditambahkan.");
    },
    onError: () => {
      toast.error("Gagal menambahkan category.");
    },
  });

  return (
    <CategoryForm
      defaultValues={{
        name: category?.name ?? "",
      }}
      onSubmit={async (value) => {
        await mutateAsync({
          name: value.name,
        });
      }}
      isLoading={isLoading}
    />
  );
}
