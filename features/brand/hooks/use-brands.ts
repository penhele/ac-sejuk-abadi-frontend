import { useQuery } from "@tanstack/react-query";
import { getBrandsQueryOptions } from "../queries/brand-queries";

export function useBrands() {
  return useQuery(getBrandsQueryOptions());
}
