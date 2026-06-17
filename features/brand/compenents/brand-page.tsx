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
import CreateBrandForm from "@/features/brand/compenents/create-brand-form";
import { useBrands } from "../hooks/use-brands";
import { brandColumns } from "./brand-columns";

export default function BrandPage() {
  const { data: brands, isFetching } = useBrands();

  return (
    <div className="space-y-between-items">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-semibold text-xl">Brands</h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Create Brand</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create Brand</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>

            <CreateBrandForm />
          </SheetContent>
        </Sheet>
      </div>

      <DataTable
        columns={brandColumns}
        data={brands || []}
        isFetching={isFetching}
      />
    </div>
  );
}
