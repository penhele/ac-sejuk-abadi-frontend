import CategoryBadge from "@/components/badges/category-badge";
import PkBadge from "@/components/badges/pk-badge";
import DeleteButton from "@/components/buttons/delete-button";
import EditButtonHref from "@/components/buttons/edit-button-href";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import AcProductTypeBadge from "@/features/acType/components/ac-type-badge";
import { deleteProduct, productKeys } from "@/features/product";
import { Product } from "@/features/product/types/product";
import { formatNumber } from "@/lib/format/currency";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown } from "lucide-react";

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
    header: "Freon",
    cell: ({ row }) => {
      return <span>{row.original.freon_type}</span>;
    },
  },
  {
    header: "Nama Seri",
    cell: ({ row }) => {
      return <span>{row.original.series_name}</span>;
    },
  },
  {
    header: "Kode Model",
    cell: ({ row }) => {
      return <span>{row.original.model_code}</span>;
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
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="space-x-2">
          <EditButtonHref routes={ROUTES.EDIT_PRODUCT(product.id)} />
          <DeleteButton
            id={product.id}
            mutationFn={deleteProduct}
            queryKey={productKeys.all}
            item={product.name}
          />
        </div>
      );
    },
  },
];
