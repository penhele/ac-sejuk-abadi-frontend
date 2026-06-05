import { addCategory } from "@/features/category/api/add-category";
import { getCategoriesQueryOptions } from "@/features/category/queries/category-queries";
import DialogForm from "./dialog-form";

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
