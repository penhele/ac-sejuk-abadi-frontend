"use client";

import { getProductsInfiniteQueryOptions } from "@/hooks/queries/product-queries";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function PaginationSection() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(getProductsInfiniteQueryOptions());

  const lastPage = data?.pages[data.pages.length - 1];

  return (
    <div>
      <Button
        className={cn("w-full")}
        onClick={() => hasNextPage && fetchNextPage()}
      >
        {isFetchingNextPage ? <Spinner /> : "Load More"}
      </Button>
    </div>
  );
}
