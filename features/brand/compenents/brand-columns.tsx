import DeleteButton from "@/components/buttons/delete-button";
import SheetButton from "@/components/buttons/sheet-button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { deleteBrand } from "../api/delete-brand";
import { brandKeys } from "../queries/brand-keys";
import { Brand } from "../types/brand";
import EditBrandForm from "./edit-brand-form";

export const brandColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: "id",
    header: "ID Brand",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Total Produk",
    cell: ({ row }) => {
      return <span>{row.original._count.products}</span>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="space-x-1">
        <SheetButton title="Update Brand" Icon={Pencil}>
          <EditBrandForm id={row.original.id} />
        </SheetButton>

        <DeleteButton
          id={row.original.id}
          mutationFn={deleteBrand}
          queryKey={brandKeys.all}
          item={row.original.name}
        />
      </div>
    ),
  },
];
