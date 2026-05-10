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
    staleTime: 1000 * 60 * 5,
  });
}

export function getProductsInfiniteQueryOptions(params?: GetProductOptions) {
  return infiniteQueryOptions({
    queryKey: ["products", "infinite", params],
    queryFn: ({ pageParam }) =>
      getProducts({ page: pageParam, limit: 6, ...params }),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta) return undefined;
      const hasMore = lastPage.meta.total_pages > lastPage.meta.page;

      return hasMore ? lastPage.meta.page + 1 : undefined;
    },
  });
}
