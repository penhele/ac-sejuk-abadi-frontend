import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import { deleteCategory } from "@/services/category.service";
import { AcType } from "@/types/ac-type";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import CategoryBadge from "../badges/category-badge";
import DeleteButton from "../buttons/delete-button2";
import EditButton from "../buttons/edit-button";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getAcTypesQueryOptions } from "@/hooks/queries/ac-type-queries";
import AcProductTypeBadge from "../badges/ac-type-badge";
import { deleteAcType } from "@/services/ac-type.service";

export const acTypeColumns: ColumnDef<AcType>[] = [
  {
    accessorKey: "id",
    header: "ID AC Type",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <AcProductTypeBadge acType={row.original.name} />;
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
              mutationFn={deleteAcType}
              queryKey={getAcTypesQueryOptions().queryKey}
              id={row.original.id}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
