"use client";

import { useProductsInfinite } from "@/features/product";
import useProductFilters from "@/hooks/use-product-filters";
import { cn } from "@/lib/utils";

export default function TotalItems({ className }: { className?: string }) {
  const { search, sortBy, sortOrder, id_brand, min_price, max_price } =
    useProductFilters();

  const { data } = useProductsInfinite({
    search,
    sortBy,
    sortOrder,
    id_brand,
    min_price,
    max_price,
  });

  const totalItems = data?.pages[0].meta.total || 0;
  const currentView = data?.pages.flatMap((page) => page.data).length || 0;

  return (
    <span className={cn("text-gray-600 text-sm", className)}>
      Showing {currentView} of {totalItems} products
    </span>
  );
}
