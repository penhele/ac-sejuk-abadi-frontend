import { useQuery } from "@tanstack/react-query";
import { getBannersQueryOptions } from "../queries/banner-queries";

export const useBanners = () => {
  return useQuery(getBannersQueryOptions());
};
