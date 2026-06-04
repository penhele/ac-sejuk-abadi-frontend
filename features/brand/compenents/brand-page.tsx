"use client";

import { DataTable } from "@/components/tables/data-table";
import { brandColumns } from "./brand-columns";
import { useBrands } from "../hooks/use-brands";
import { Button } from "@/components/ui/button";

export default function BrandPage() {
  const { data: brands } = useBrands();

  return (
    <div className="space-y-between-items">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-semibold text-xl">Brands</h1>
        <Button>Create Brand</Button>
      </div>

      <DataTable columns={brandColumns} data={brands || []} />
    </div>
  );
}
