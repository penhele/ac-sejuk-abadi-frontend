import { ROUTES } from "@/constants/routes";
import { productKeys } from "@/features/queries/product-keys";
import { formatNumber } from "@/lib/format/currency";
import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown, EllipsisIcon } from "lucide-react";
import AcProductTypeBadge from "../badges/ac-type-badge";
import CategoryBadge from "../badges/category-badge";
import PkBadge from "../badges/pk-badge";
import DeleteButton from "../buttons/delete-button";
import EditButton from "../buttons/edit-button";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteProduct } from "@/features/product/api/delete-product";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID Product",
  },
  {
    accessorKey: "id_brand",
    header: "Brand",
    cell: ({ row }) => {
      return <span>{row.original.brand.name}</span>;
    },
  },
  {
    header: "Images",
    cell: ({ row }) => {
      return <span>{row.original.images.length}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pk",
    header: "PK",
    cell: ({ row }) => <PkBadge pk={row.original.pk} />,
  },
  {
    accessorFn: (row) => row.ac_type.name,
    header: "Type",
    cell: ({ row }) => (
      <AcProductTypeBadge acType={row.original.ac_type.name} />
    ),
  },
  {
    id: "category",
    accessorFn: (row) => row.category.name,
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => <CategoryBadge category={row.original.category.name} />,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>IDR {formatNumber(row.original.price)}</span>,
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
            <EditButton href={ROUTES.EDIT_PRODUCT(row.original.id)} />
            <DeleteButton
              mutationFn={deleteProduct}
              queryKey={productKeys.all}
              id={row.original.id}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
