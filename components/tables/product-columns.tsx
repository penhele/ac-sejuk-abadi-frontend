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
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon-xs"} variant={"ghost"}>
            <EllipsisIcon size={12} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Edit
              <DropdownMenuShortcut>
                <Pencil size={12} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>
                <Trash size={12} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
