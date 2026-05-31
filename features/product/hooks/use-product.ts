import { useQuery } from "@tanstack/react-query";
import { getProductByIdQueryOptions } from "..";

export function useProduct(id: string | number) {
  return useQuery(getProductByIdQueryOptions(id));
}
