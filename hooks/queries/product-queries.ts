import { getProducts } from "@/services/product.service";
import { GetProductOptions, ProductResponse } from "@/types/product";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export default function getProductsQueryOptions<
  TData = ProductResponse,
  TError = Error,
>(
  params?: GetProductOptions,
  options?: Omit<
    UseQueryOptions<ProductResponse, TError, TData>,
    "queryKey" | "queryFn"
  >,
) {
  return queryOptions({
    ...options,
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}
