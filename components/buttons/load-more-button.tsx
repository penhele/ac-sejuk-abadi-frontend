"use client";

import useProductsInfinite from "@/features/product/hooks/use-products-infinite";
import useProductFilters from "@/hooks/use-product-filters";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function LoadMoreButton() {
  const { search, sortBy, sortOrder, id_brand, min_price, max_price } =
    useProductFilters();

  const { hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProductsInfinite({
      search,
      sortBy,
      sortOrder,
      id_brand,
      min_price,
      max_price,
    });

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
