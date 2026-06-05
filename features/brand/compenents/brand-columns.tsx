import { ColumnDef } from "@tanstack/react-table";
import { Brand } from "../types/brand";
import DeleteButton from "@/components/buttons/delete-button";
import { deleteBrand } from "../api/delete-brand";
import { brandKeys } from "../queries/brand-keys";
import EditButton from "./edit-button";

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
        <EditButton id={row.original.id} />

        <DeleteButton
          id={row.original.id}
          mutationFn={deleteBrand}
          queryKey={brandKeys.all}
        />
      </div>
    ),
  },
];
