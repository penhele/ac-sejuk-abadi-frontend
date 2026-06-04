import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import { deleteCategory } from "@/services/category.service";
import { Category } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import CategoryBadge from "../badges/category-badge";
import DeleteButton from "../buttons/delete-button2";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
