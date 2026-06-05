import { useQuery } from "@tanstack/react-query";
import { getBrandByIdQueryOptions } from "../queries/brand-queries";

export function useBrand(id: string | number) {
  return useQuery(getBrandByIdQueryOptions(id));
}
