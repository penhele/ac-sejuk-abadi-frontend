import { useQuery } from "@tanstack/react-query";
import { GetProductOptions } from "../types/product-options";
import { getProductsQueryOptions } from "..";

export function useProducts(params?: GetProductOptions) {
  return useQuery(getProductsQueryOptions(params));
}
