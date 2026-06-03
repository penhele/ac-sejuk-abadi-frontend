import { useQuery } from "@tanstack/react-query";
import { getSponsoredBrandsQueryOptions } from "../queries/brand-queries";

export function useSponsoredBrands() {
  return useQuery(getSponsoredBrandsQueryOptions());
}
