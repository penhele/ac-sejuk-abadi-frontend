import { queryOptions } from "@tanstack/react-query";
import { getBrands } from "../api/get-brands";
import { brandKeys } from "./brand-keys";
import { getSponsoredBrands } from "../api/get-sponsored-brands";
import { getBrand } from "../api/get-brand";

export const getBrandsQueryOptions = () =>
  queryOptions({
    queryKey: brandKeys.all,
    queryFn: getBrands,
    staleTime: 1000 * 60 * 5,
  });

export const getBrandByIdQueryOptions = (id: string | number) =>
  queryOptions({
    queryKey: ["brands", id],
    queryFn: () => getBrand(id),
    staleTime: 1000 * 60 * 5,
  });

export const getSponsoredBrandsQueryOptions = () =>
  queryOptions({
    queryKey: ["sponsored-brands"],
    queryFn: getSponsoredBrands,
    staleTime: 1000 * 60 * 5,
  });
