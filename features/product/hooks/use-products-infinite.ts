import { useInfiniteQuery } from "@tanstack/react-query";
import { GetProductOptions } from "../types/product-options";
import { getProductsInfiniteQueryOptions } from "../queries";

export default function useProductsInfinite(params?: GetProductOptions) {
  return useInfiniteQuery(getProductsInfiniteQueryOptions(params));
}
