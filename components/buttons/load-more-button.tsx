"use client";

import { getProductsInfiniteQueryOptions } from "@/hooks/queries/product-queries";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function LoadMoreButton() {
  const { hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    getProductsInfiniteQueryOptions(),
  );

  return (
    <div>
      <Button
        className={cn("w-full")}
        onClick={() => hasNextPage && fetchNextPage()}
        disabled={!hasNextPage}
      >
        {isFetchingNextPage ? <Spinner /> : "Muat lebih banyak"}
      </Button>
    </div>
  );
}
