import { formatDate } from "@/lib/format/date";
import { Project } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";

export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "ID Project",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span>{formatDate(row.original.date)}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "id_product",
    header: "ID Product",
  },
];
