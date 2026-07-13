"use client";

import SheetButton from "@/components/buttons/sheet-button";
import { DataTable } from "@/components/tables/data-table";
import CreateBrandForm from "@/features/brand/compenents/create-brand-form";
import { useBrands } from "../hooks/use-brands";
import { brandColumns } from "./brand-columns";
import { Plus } from "lucide-react";

export default function BrandPage() {
  const { data: brands, isFetching } = useBrands();

  return (
    <div className="space-y-between-items">
      <DataTable
        columns={brandColumns}
        data={brands || []}
        isFetching={isFetching}
        title="Brands"
        action={
          <SheetButton
            label="Create Brand"
            title="Create Brand"
            Icon={Plus}
            description="Kelola brand di sini"
          >
            <CreateBrandForm />
          </SheetButton>
        }
      />
    </div>
  );
}
