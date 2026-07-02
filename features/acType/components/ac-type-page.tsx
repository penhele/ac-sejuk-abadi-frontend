"use client";

import SheetButton from "@/components/buttons/sheet-button";
import { DataTable } from "@/components/tables/data-table";
import { Plus } from "lucide-react";
import useAcTypes from "../hooks/use-ac-types";
import { acTypeColumns } from "./ac-type-column";
import CreateAcTypeForm from "./create-ac-type-form";

export default function AcTypePage() {
  const { data: acTypes, isFetching } = useAcTypes();

  return (
    <div className="space-y-between-items">
      <DataTable
        columns={acTypeColumns}
        data={acTypes || []}
        isFetching={isFetching}
        title="AC Type"
        action={
          <SheetButton label="Add AC Type" Icon={Plus} title="Create AC Type">
            <CreateAcTypeForm />
          </SheetButton>
        }
      />
    </div>
  );
}
