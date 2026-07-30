import { queryOptions, useQuery } from "@tanstack/react-query";
import { getLastSycned } from "../api/get-last-synced";

export const useLastSynced = () =>
  useQuery(
    queryOptions({
      queryFn: getLastSycned,
      queryKey: ["last-synced"],
      staleTime: 1000 * 60 * 5,
    }),
  );
