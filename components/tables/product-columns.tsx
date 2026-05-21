import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { EllipsisIcon, FormInputIcon } from "lucide-react";
import DeleteButton from "../buttons/delete-button";
import EditButton from "../buttons/edit-button";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { formatNumber } from "@/lib/format/currency";
import { deleteProduct } from "@/services/product.service";
import { getProductsQueryOptions } from "@/hooks/queries/product-queries";

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
    cell: ({ row }) => <span>{formatNumber(row.original.price)}</span>,
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => {
      return (
        <span>
          {formatDistanceToNow(new Date(row.original.updated_at), {
            addSuffix: true,
          })}
        </span>
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
            <DeleteButton
              mutationFn={deleteProduct}
              queryKey={getProductsQueryOptions().queryKey}
              id={row.original.id}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
