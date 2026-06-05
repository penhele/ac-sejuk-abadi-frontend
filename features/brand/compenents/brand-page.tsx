"use client";

import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useBrands } from "../hooks/use-brands";
import { brandColumns } from "./brand-columns";
import CreateBrandForm from "@/features/brand/compenents/create-brand-form";

export default function BrandPage() {
  const { data: brands } = useBrands();

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

      <DataTable columns={brandColumns} data={brands || []} />
    </div>
  );
}
