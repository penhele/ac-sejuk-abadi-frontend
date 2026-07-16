import CategoryBadge from "@/components/badges/category-badge";
import PkBadge from "@/components/badges/pk-badge";
import ButtonLink from "@/components/buttons/button-link";
import DeleteButton from "@/components/buttons/delete-button";
import EditButtonHref from "@/components/buttons/edit-button-href";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ROUTES } from "@/constants/routes";
import AcProductTypeBadge from "@/features/acType/components/ac-type-badge";
import { deleteProduct, productKeys } from "@/features/product";
import { Product } from "@/features/product/types/product";
import { formatNumber } from "@/lib/format/currency";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown, Eye } from "lucide-react";
import ProductCard from "./product-card";

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
      const freonType = row.original.freon_type;

      return <span>{freonType?.length ? freonType : "-"}</span>;
    },
  },
  {
    header: "Nama Seri",
    cell: ({ row }) => {
      const seriesName = row.original.series_name;

      return <span>{seriesName?.length ? seriesName : "-"}</span>;
    },
  },
  {
    header: "Kode Model",
    cell: ({ row }) => {
      const modelCode = row.original.model_code;

      return <span>{modelCode?.length ? modelCode : "-"}</span>;
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} size={"icon-xs"}>
                <Eye />
              </Button>
            </DialogTrigger>

            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
              <DialogTitle>Preview Product</DialogTitle>
              <ProductCard product={product} preview/>
            </DialogContent>
          </Dialog>

          <ButtonLink
            routes={ROUTES.DASHBOARD_UPLOAD_PRODUCT_IMAGES(product.id)}
          />

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
