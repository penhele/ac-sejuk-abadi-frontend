import DeleteButton from "@/components/buttons/delete-button";
import EditButton from "@/features/brand/compenents/edit-button";
import { Category } from "@/features/category/types/category";
import { ColumnDef } from "@tanstack/react-table";
import CategoryBadge from "../../../components/badges/category-badge";
import { deleteCategory } from "../api/delete-category";
import { categoryKeys } from "../queries/category-keys";
import EditCategoryForm from "./edit-category-form";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID Category",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <CategoryBadge category={row.original.name} />;
    },
  },
  {
    accessorKey: "_count",
    header: "Total Products",
    cell: ({ row }) => {
      return <span>{row.original._count.products}</span>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="space-x-1">
        <EditButton title="Update Category">
          <EditCategoryForm id={row.original.id} />
        </EditButton>

        <DeleteButton
          id={row.original.id}
          mutationFn={deleteCategory}
          queryKey={categoryKeys.all}
        />
      </div>
    ),
  },
];
