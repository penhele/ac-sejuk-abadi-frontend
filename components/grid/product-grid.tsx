"use client";

import { getProductsInfiniteQueryOptions } from "@/hooks/queries/product-queries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import ProductList from "../lists/product-list";
import useProductFilters from "@/hooks/use-product-filters";
import EmptyState from "../empty-state/empty-state";

export default function ProductGrid({ className }: { className?: string }) {
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

  const products = data?.pages.flatMap((page) => page.data);

  return (
    <div className="">
      {products.length != 0 ? (
        <ProductList products={products} className={className} />
      ) : (
        <EmptyState Icon={SearchX} label="No products found" />
      )}
    </div>
  );
}
