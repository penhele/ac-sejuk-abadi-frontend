"use client";

import { getProductsInfiniteQueryOptions } from "@/hooks/queries/product-queries";
import useProductFilters from "@/hooks/use-product-filters";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function LoadMoreButton() {
  const { search, sortBy, sortOrder, id_brand, min_price, max_price } =
    useProductFilters();

  const { hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    getProductsInfiniteQueryOptions({
      search,
      sortBy,
      sortOrder,
      id_brand,
      min_price,
      max_price,
    }),
  );

  if (!hasNextPage) return null;

  return (
    <div>
      <Button
        className={cn("w-full")}
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? <Spinner /> : "Muat lebih banyak"}
      </Button>
    </div>
  );
}
