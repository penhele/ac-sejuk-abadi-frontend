"use client";

import {
  getProductsInfiniteQueryOptions,
  getProductsQueryOptions,
} from "@/hooks/queries/product-queries";
import useProductFilters from "@/hooks/use-product-filters";
import {
  useInfiniteQuery,
  useQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import EmptyState from "../empty-state/empty-state";
import ProductList from "../lists/product-list";

export default function ProductGrid({
  className,
  limit,
}: {
  className?: string;
  limit?: number;
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

  const { data, isFetching } = useInfiniteQuery(
    getProductsInfiniteQueryOptions({
      search,
      sortBy,
      sortOrder,
      id_brand,
      id_ac_type,
      id_category,
      min_price,
      max_price,
      limit,
    }),
  );

  // SOLUSI: Berikan fallback || [] agar tidak pernah undefined
  const products = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  console.log(isFetching);

  return (
    <div className="">
      {/* SOLUSI: Gunakan ?.length untuk keamanan ekstra */}
      {products && products?.length > 0 ? (
        <ProductList products={products} className={className} />
      ) : (
        <EmptyState Icon={SearchX} label="No products found" />
      )}
    </div>
  );
}
