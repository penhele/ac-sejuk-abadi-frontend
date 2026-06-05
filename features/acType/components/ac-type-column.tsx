import DeleteButton from "@/components/buttons/delete-button";
import AcProductTypeBadge from "@/features/acType/components/ac-type-badge";
import EditButton from "@/features/brand/compenents/edit-button";
import { ColumnDef } from "@tanstack/react-table";
import { deleteAcType } from "../api/delete-ac-type";
import { acTypeKeys } from "../queries/ac-type-keys";
import { AcType } from "../types/ac-type";
import EditAcTypeForm from "./edit-ac-type-form";

export const acTypeColumns: ColumnDef<AcType>[] = [
  {
    accessorKey: "id",
    header: "ID Category",
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
      <div className="space-x-1">
        <EditButton title="Update AC Type">
          <div className=""></div>
          <EditAcTypeForm id={row.original.id} />
        </EditButton>

        <DeleteButton
          id={row.original.id}
          mutationFn={deleteAcType}
          queryKey={acTypeKeys.all}
        />
      </div>
    ),
  },
];
