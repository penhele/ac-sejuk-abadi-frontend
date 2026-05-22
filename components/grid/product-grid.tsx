"use client";

import { getProductsInfiniteQueryOptions } from "@/hooks/queries/product-queries";
import useProductFilters from "@/hooks/use-product-filters";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import ProductCard from "../cards/product-card";
import EmptyState from "../empty-state/empty-state";
import ProductFallback from "../fallback/product-fallback";
import { cn } from "@/lib/utils";

export default function ProductGrid({
  className,
  length,
}: {
  className?: string;
  length?: number;
}) {
  const {
    search,
    sortBy,
    sortOrder,
    id_brand,
    id_ac_type,
    id_category,
    min_price,
    max_price,
  } = useProductFilters();

  const { data, isPending, isError } = useInfiniteQuery(
    getProductsInfiniteQueryOptions({
      search,
      sortBy,
      sortOrder,
      id_brand,
      id_ac_type,
      id_category,
      min_price,
      max_price,
      limit: 4,
    }),
  );

  const products = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  if (isPending) {
    return <ProductFallback length={length ?? 6} />;
  }

  if (!products.length) {
    return <EmptyState Icon={SearchX} label="No products found" />;
  }

  if (isError) {
    return <EmptyState Icon={SearchX} label="Failed to load products" />;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-between-card",
        length === 3 && "xs:grid-cols-3 md:grid-cols-3",
        length === 4 && "xs:grid-cols-3 md:grid-cols-4",
        !length && "xs:grid-cols-3",
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
