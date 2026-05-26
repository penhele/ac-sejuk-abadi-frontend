import { addCategory } from "@/services/category.service";
import DialogForm from "./dialog-form";
import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import { createCategorySchema } from "@/schemas/category.schema";

export default function CreateCategoryForm() {
  return (
    <DialogForm
      title="Add new category"
      defaultValues={{ name: "" }}
      onSubmit={addCategory}
      invalidateQueryKey={getCategoriesQueryOptions().queryKey}
      successMessage="Berhasil menambahkan kategori"
      errorMessage="Gagal menambahkan kategori"
    />
  );
}
