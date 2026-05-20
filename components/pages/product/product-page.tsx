"use client";

import { DataTable } from "@/components/tables/data-table";
import { productColumns } from "@/components/tables/product-columns";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { useQuery } from "@tanstack/react-query";
import { Info, Plus } from "lucide-react";

export default function ProductPage() {
  const { data: response } = useQuery(getProductsQueryOptions());

  const products = response?.data ?? [];

  return (
    <div className="space-y-between-items">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Products</h1>

        <Button>
          <Plus /> Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-4">
        <div className="p-inside-card border rounded-lg space-y-between-items bg-muted/50">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm font-medium">Products</span>

            <Tooltip>
              <TooltipTrigger>
                <Info size={12} className="text-gray-600" />
              </TooltipTrigger>

              <TooltipContent>
                <span>Total products</span>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex flex-row justify-between items-end">
            <span className="text-4xl">{products.length}</span>

            <div className="flex flex-col text-xs items-end">
              <span className="bg-green-200 text-green-600 py-0.5 px-1.5 rounded-lg">
                + 3 product
              </span>
              <span>from last week</span>
            </div>
          </div>
        </div>
      </div>

      <DataTable columns={productColumns} data={products} />
    </div>
  );
}
