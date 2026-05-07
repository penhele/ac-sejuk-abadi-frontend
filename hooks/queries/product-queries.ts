import { getProducts } from "@/services/product.service";
import { GetProductOptions, ProductResponse } from "@/types/product";
import {
  infiniteQueryOptions,
  queryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export function getProductsQueryOptions<
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

export function getProductsInfiniteQueryOptions() {
  return infiniteQueryOptions({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts({ page: pageParam, limit: 6 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const hasMore = lastPage.meta.total_pages >= lastPage.meta.page;

      return hasMore ? lastPage.meta.page + 1 : undefined;
    },
  });
}
