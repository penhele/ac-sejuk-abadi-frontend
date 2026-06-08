import { queryOptions } from "@tanstack/react-query";
import { bannerKeys } from "./banner-keys";
import { getBanners } from "../api/get-banners";

export const getBannersQueryOptions = () =>
  queryOptions({
    queryKey: bannerKeys.all,
    queryFn: getBanners,
    staleTime: 1000 * 60 * 5,
  });
