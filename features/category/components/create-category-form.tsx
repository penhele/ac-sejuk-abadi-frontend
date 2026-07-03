import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { addCategory } from "../api/add-category";
import { categoryKeys } from "../queries/category-keys";
import CategoryForm from "./category-form";

export default function CreateCategoryForm() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: addCategory,
  });

  return (
    <CategoryForm
      defaultValues={{
        name: "",
      }}
      onSubmit={async (value) => {
        goeyToast.promise(mutateAsync(value), {
          loading: "Loading...",
          success: () => {
            queryClient.invalidateQueries({
              queryKey: categoryKeys.all,
            });

            return "Kategori berhasil ditambahkan";
          },
          error: (err) => (err as AppError).message,
        });
      }}
    />
  );
}
