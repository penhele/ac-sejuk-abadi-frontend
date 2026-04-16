"use client";

import { getProducts } from "@/services/product.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductList from "../lists/product-list";
import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ProductGrid({
  limit,
  className,
}: {
  limit?: number;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const id_brand = searchParams.get("id_brand") || undefined;

  const { data: response } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(1, 50, id_brand),
  });

  const products = response?.data || [];

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
