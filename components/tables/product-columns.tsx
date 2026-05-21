import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon, Pencil, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteButton from "../buttons/delete-button";
import Link from "next/link";
import EditButton from "../buttons/edit-button";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID Product",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "pk",
    header: "PK",
  },
  {
    header: "Type",
    accessorFn: (row) => row.ac_type.name,
  },
  {
    header: "Category",
    accessorFn: (row) => row.category.name,
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => {
      return (
        <div>
          {formatDistanceToNow(new Date(row.original.updated_at), {
            addSuffix: true,
          })}
        </div>
      );
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
            <EditButton id={row.original.id} />
            <DeleteButton id={row.original.id} />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
