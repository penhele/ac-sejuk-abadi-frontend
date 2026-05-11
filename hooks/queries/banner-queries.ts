import { getBanners } from "@/services/banner.service";
import { queryOptions } from "@tanstack/react-query";

export default function getBannersQueryOptions() {
  return queryOptions({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 1000 * 60 * 5,
  });
}
