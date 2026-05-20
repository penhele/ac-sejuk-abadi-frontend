import { getBanners } from "@/services/banner.service";
import { queryOptions } from "@tanstack/react-query";

export const getBannersQueryOptions = queryOptions({
  queryKey: ["banners"],
  queryFn: getBanners,
  staleTime: 1000 * 60 * 5,
});
