import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryForm from "./category-form";
import { addCategory } from "../api/add-category";
import { categoryKeys } from "../queries/category-keys";
import { toast } from "sonner";

export default function CreateCategoryForm() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: addCategory,
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
        name: "",
      }}
      onSubmit={async (value) => {
        await mutateAsync({
          name: value.name,
        });
      }}
    />
  );
}
