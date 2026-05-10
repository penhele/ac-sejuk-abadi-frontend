"use client";

import { getProductsInfiniteQueryOptions } from "@/hooks/queries/product-queries";
import useProductFilters from "@/hooks/use-product-filters";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export default function TotalItems() {
  const { search, sortBy, sortOrder, id_brand, min_price, max_price } =
    useProductFilters();

  const { data } = useSuspenseInfiniteQuery(
    getProductsInfiniteQueryOptions({
      search,
      sortBy,
      sortOrder,
      id_brand,
      min_price,
      max_price,
    }),
  );

  const totalItems = data?.pages[0].meta.total || 0;
  const currentView = data?.pages.flatMap((page) => page.data).length || 0;

  return (
    <span className="text-gray-600 text-sm">
      Showing {currentView} of {totalItems} products
    </span>
  );
}
