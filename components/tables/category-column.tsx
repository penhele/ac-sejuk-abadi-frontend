import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { deleteProduct } from "@/services/product.service";
import { Category } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import DeleteButton from "../buttons/delete-button";
import EditButton from "../buttons/edit-button";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import { deleteCategory } from "@/services/category.service";
import CategoryBadge from "../badges/category-badge";

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon-xs"} variant={"ghost"}>
            <EllipsisIcon size={12} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DeleteButton
              mutationFn={deleteCategory}
              queryKey={getCategoriesQueryOptions().queryKey}
              id={row.original.id}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
