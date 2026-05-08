"use client";

import { getProductsInfiniteQueryOptions } from "@/hooks/queries/product-queries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import ProductList from "../lists/product-list";
import useProductFilters from "@/hooks/use-product-filters";

export default function ProductGrid({ className }: { className?: string }) {
  const { search } = useProductFilters();

  const { data } = useSuspenseInfiniteQuery(
    getProductsInfiniteQueryOptions({ search }),
  );

  const products = data?.pages.flatMap((page) => page.data);

  if (products.length === 0)
    return (
      <div className="flex flex-col items-center space-y-4">
        <SearchX size={80} className="text-gray-200" />
        <span className="font-semibold">No products found</span>
      </div>
    );

  return <ProductList products={products} className={className} />;
}
