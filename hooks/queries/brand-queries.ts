import { getBrands } from "@/services/brand.service";
import { queryOptions } from "@tanstack/react-query";

export default function getBrandsQueryOptions() {
  return queryOptions({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 1000 * 60 * 5,
  });
}
