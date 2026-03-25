"use client";

import { ColumnDef } from "@tanstack/react-table";

export type AcSpecification = {
  property: string;
  value: string;
};

export const columns: ColumnDef<AcSpecification>[] = [
  {
    accessorKey: "property",
    header: "Spesifikasi",
    cell: ({ row }) => {
      return (
        <div className="font-semibold text-gray-600">
          {row.getValue("property")}
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Detail",
    cell: ({ row }) => {
      return <div className="text-gray-900">{row.getValue("value")}</div>;
    },
  },
];
