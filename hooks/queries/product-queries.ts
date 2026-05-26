import { getProductById, getProducts } from "@/services/product.service";
import { GetProductOptions, ProductResponse } from "@/types/product";
import {
  infiniteQueryOptions,
  queryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export const getProductsQueryOptions = <
  TData = ProductResponse,
  TError = Error,
>(
  params?: GetProductOptions,
  options?: Omit<
    UseQueryOptions<ProductResponse, TError, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return queryOptions({
    ...options,
    queryKey: params ? ["products", params] : ["products"],
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const getProductByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const getProductsInfiniteQueryOptions = (params?: GetProductOptions) => {
  return infiniteQueryOptions({
    queryKey: ["products", "infinite", params],
    queryFn: ({ pageParam }) => getProducts({ ...params, page: pageParam }),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.meta;
      if (page >= total_pages) return undefined;

      return page + 1;
    },

    getPreviousPageParam: (firstPage) => {
      const { page } = firstPage.meta;
      if (page <= 1) return undefined;

      return page - 1;
    },

    throwOnError: false,
  });
};
