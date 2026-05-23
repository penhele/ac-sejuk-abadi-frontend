"use client";

import { DataTable } from "@/components/tables/data-table";
import { productColumns } from "@/components/tables/product-columns";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes";
import { getBrandsQueryOptions } from "@/hooks/queries/brand-queries";
import {
  getProductsQueryOptions
} from "@/hooks/queries/product-queries";
import { useQuery } from "@tanstack/react-query";
import { Info, Plus } from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  const { data: response, isFetching } = useQuery(
    getProductsQueryOptions({ page: 1 }),
  );
  const { data: brands } = useQuery(getBrandsQueryOptions());

  const products = response?.data || [];
  const totalProducts = response?.meta.total || 0;

  return (
    <div className="space-y-between-items">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Products</h1>

        <Link href={ROUTES.CREATE_PRODUCTS}>
          <Button>
            <Plus /> Add New Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-between-card">
        <div className="p-inside-card border rounded-lg space-y-between-items bg-muted/25">
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
            <span className="text-4xl">{totalProducts}</span>

            <div className="flex flex-col text-xs items-end">
              <span className="bg-green-200 text-green-600 py-0.5 px-1.5 rounded-lg">
                + 3 product
              </span>
              <span>from last week</span>
            </div>
          </div>
        </div>

        <div className="p-inside-card border rounded-lg space-y-between-items bg-muted/25">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm font-medium">Brands</span>

            <Tooltip>
              <TooltipTrigger>
                <Info size={12} className="text-gray-600" />
              </TooltipTrigger>

              <TooltipContent>
                <span>Total Brands</span>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex flex-row justify-between items-end">
            <span className="text-4xl">{brands?.length}</span>
          </div>
        </div>
      </div>

      <DataTable
        isFetching={isFetching}
        columns={productColumns}
        data={products}
        pageSize={10}
        pageIndex={1}
        isFilter
        isPagination
      />
    </div>
  );
}
