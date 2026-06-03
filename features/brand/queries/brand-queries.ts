import { queryOptions } from "@tanstack/react-query";
import { getBrands } from "../api/get-brands";
import { brandKeys } from "./brand-keys";
import { getSponsoredBrands } from "../api/get-sponsored-brands";

export const getBrandsQueryOptions = () =>
  queryOptions({
    queryKey: brandKeys.all,
    queryFn: getBrands,
    staleTime: 1000 * 60 * 5,
  });

export const getSponsoredBrandsQueryOptions = () =>
  queryOptions({
    queryKey: ["sponsored-brands"],
    queryFn: getSponsoredBrands,
    staleTime: 1000 * 60 * 5,
  });
