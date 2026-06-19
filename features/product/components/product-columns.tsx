import { ROUTES } from "@/constants/routes";
import { formatNumber } from "@/lib/format/currency";
import { Product } from "@/features/product/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown, EllipsisIcon } from "lucide-react";
import { deleteProduct } from "@/features/product";
import { productKeys } from "@/features/product";
import { Button } from "@/components/ui/button";
import PkBadge from "@/components/badges/pk-badge";
import AcProductTypeBadge from "@/features/acType/components/ac-type-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CategoryBadge from "@/components/badges/category-badge";
import DeleteButton from "@/components/buttons/delete-button";
import EditButton from "@/components/buttons/edit-button";

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
    header: "Type",
    cell: ({ row }) => {
      const acTypeId = row.original.id_ac_type;

      return (
        <AcProductTypeBadge
          acType={acTypeId ? row.original.ac_type.name : undefined}
        />
      );
    },
  },
  {
    id: "category",
    accessorFn: (row) => row.category?.name ?? "",
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
    cell: ({ row }) => {
      const categoryId = row.original.id_category;

      return (
        <CategoryBadge
          category={categoryId ? row.original.category.name : undefined}
        />
      );
    },
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
