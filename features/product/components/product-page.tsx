"use client";

import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes";
import { useBrands } from "@/features/brand/hooks/use-brands";
import { useProducts } from "@/features/product";
import { productColumns } from "@/features/product/components/product-columns";
import useDebounce from "@/hooks/use-debounce";
import useProductFilters from "@/hooks/use-product-filters";
import { Info, Plus, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { search, setFilters } = useProductFilters();
  const router = useRouter();

  const [localSearch, setLocalSearch] = useState(search || "");

  const debouncedSearch = useDebounce(localSearch, 500);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data: response, isFetching } = useProducts({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: debouncedSearch,
  });

  useEffect(() => {
    setFilters({ search: debouncedSearch });

    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedSearch, setFilters]);

  const { data: brands } = useBrands();

  const products = response?.data || [];
  const totalProducts = response?.meta.total || 0;

  return (
    <div className="space-y-between-items">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Products</h1>
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
            <span className="text-4xl">{brands?.length ?? 0}</span>
          </div>
        </div>
      </div>

      <DataTable
        isFetching={isFetching}
        columns={productColumns}
        data={products}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={response?.meta?.total_pages ?? 0}
        rowCount={totalProducts}
        isFilter
        isPagination
        searchValue={localSearch}
        onSearchChange={(value) => setLocalSearch(value)}
        title="Data Produk"
        action={
          <Button onClick={() => router.push(ROUTES.CREATE_PRODUCT)}>
            <PlusIcon /> Add New product
          </Button>
        }
      />
    </div>
  );
}
