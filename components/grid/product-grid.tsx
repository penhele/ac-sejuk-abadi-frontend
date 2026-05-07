"use client";

import getProductsQueryOptions from "@/hooks/queries/product-queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import ProductList from "../lists/product-list";

export default function ProductGrid({
  limit,
  className,
}: {
  limit?: number;
  className?: string;
}) {
  const { data: response } = useSuspenseQuery(getProductsQueryOptions());

  const products = response.data || [];

  if (products.length === 0)
    return (
      <div className="flex flex-col items-center space-y-4">
        <SearchX size={80} className="text-gray-200" />
        <span className="font-semibold">No products found</span>
      </div>
    );

  return (
    <ProductList products={products} className={className} limit={limit} />
  );
}
