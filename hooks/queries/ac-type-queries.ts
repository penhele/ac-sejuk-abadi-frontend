import { getTypes } from "@/services/ac-type.service";
import { queryOptions } from "@tanstack/react-query";

export const getAcTypesQueryOptions = () =>
  queryOptions({
    queryKey: ["types"],
    queryFn: getTypes,
    staleTime: 1000 * 60 * 5,
  });
