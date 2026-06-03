"use client";

import CreateBrandForm from "@/components/forms/brand/create-brand-form";
import { brandColumns } from "@/components/tables/brand-columns";
import { DataTable } from "@/components/tables/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBrands } from "@/features/brand/hooks/use-brands";

export default function BrandPage() {
  const { data: response } = useBrands();

  const brands = response || [];

  return (
    <div className="space-y-between-items">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Brands</h1>
      </div>

      <div className="grid grid-cols-3 gap-between-items">
        <DataTable
          data={brands}
          columns={brandColumns}
          className="col-span-2"
        />

        <div className="flex flex-col gap-between-items">
          <Card className="">
            <CardHeader>
              <CardTitle>Tambah Brand</CardTitle>
            </CardHeader>

            <CardContent>
              <CreateBrandForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
