import { useInfiniteQuery } from "@tanstack/react-query";
import { GetProductOptions } from "../types/product-options";
import { getProductsInfiniteQueryOptions } from "../queries/product-queries";

export function useProductsInfinite(params?: GetProductOptions) {
  return useInfiniteQuery(getProductsInfiniteQueryOptions(params));
}
