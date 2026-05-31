import { useQuery } from "@tanstack/react-query";
import { GetProductOptions } from "../types/product-options";
import { getProductsQueryOptions } from "../queries";

export default function useProducts(params?: GetProductOptions) {
  return useQuery(getProductsQueryOptions(params));
}
