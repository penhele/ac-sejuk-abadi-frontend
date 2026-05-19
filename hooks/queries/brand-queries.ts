import { getBrands, getSponsoredBrands } from "@/services/brand.service";
import { queryOptions } from "@tanstack/react-query";

export const getBrandsQueryOptions = queryOptions({
  queryKey: ["brands"],
  queryFn: getBrands,
  staleTime: 1000 * 60 * 5,
});

export const getSponsoredBrandsQueryOptions = queryOptions({
  queryKey: ["sponsored-brands"],
  queryFn: getSponsoredBrands,
  staleTime: 1000 * 60 * 5,
});
