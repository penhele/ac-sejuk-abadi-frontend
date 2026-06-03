"use client";

import { useProductsInfinite } from "@/features/product";
import useProductFilters from "@/hooks/use-product-filters";
import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";
import ProductCard from "../cards/product-card";
import EmptyState from "../empty-state/empty-state";
import ProductFallback from "../fallback/product-fallback";

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

  const { data, isPending, isError } = useProductsInfinite({
    search,
    sortBy,
    sortOrder,
    id_brand,
    id_ac_type,
    id_category,
    min_price,
    max_price,
    limit: length,
  });

  const products = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  if (isPending) {
    return <ProductFallback length={length} />;
  }

  if (!products.length) {
    return <EmptyState Icon={SearchX} label="No products found" />;
  }

  if (isError) {
    return <EmptyState Icon={SearchX} label="Failed to load products" />;
  }

  return (
    <div className={cn("grid grid-cols-5 gap-between-card", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
