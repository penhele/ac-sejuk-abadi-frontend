"use client";

import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { acTypeColumns } from "./ac-type-column";
import useAcTypes from "../hooks/use-ac-types";
import CreateAcTypeForm from "./create-ac-type-form";

export default function AcTypePage() {
  const { data: acTypes, isFetching } = useAcTypes();

  return (
    <div className="space-y-between-items">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-semibold text-xl">Ac Type</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Create AC Type</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create AC Type</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>

            <CreateAcTypeForm />
          </SheetContent>
        </Sheet>
      </div>

      <DataTable columns={acTypeColumns} data={acTypes || []} isFetching={isFetching} />
    </div>
  );
}
