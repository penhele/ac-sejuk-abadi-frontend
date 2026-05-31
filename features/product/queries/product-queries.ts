import { ProductResponse } from "@/types/product";
import {
  infiniteQueryOptions,
  queryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getProducts, getProductById } from "../api";
import { GetProductOptions } from "../types/product-options";
import { productKeys } from ".";

export const getProductsQueryOptions = <
  TData = ProductResponse,
  TError = Error,
>(
  params?: GetProductOptions,
  options?: Omit<
    UseQueryOptions<ProductResponse, TError, TData>,
    "queryKey" | "queryFn"
  >,
) =>
  queryOptions({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 5,
    ...options,
  });

export const getProductByIdQueryOptions = (id: string | number) =>
  queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5,
  });

export const getProductsInfiniteQueryOptions = (params?: GetProductOptions) =>
  infiniteQueryOptions({
    queryKey: productKeys.infinite(params),

    queryFn: ({ pageParam }) =>
      getProducts({
        ...params,
        page: pageParam,
        limit: params?.limit ?? 24,
      }),

    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.meta;
      return page < total_pages ? page + 1 : undefined;
    },

    getPreviousPageParam: (firstPage) => {
      const { page } = firstPage.meta;
      return page > 1 ? page - 1 : undefined;
    },
  });
