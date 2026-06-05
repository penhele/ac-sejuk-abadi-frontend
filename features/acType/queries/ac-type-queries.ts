import { queryOptions } from "@tanstack/react-query";
import { getAcTypes } from "../api/get-ac-types";
import { acTypeKeys } from "./ac-type-keys";
import { getAcType } from "../api/get-ac-type";

export const getAcTypesQueryOptions = () =>
  queryOptions({
    queryKey: acTypeKeys.all,
    queryFn: getAcTypes,
    staleTime: 1000 * 60 * 5,
  });

export const getAcTypeByIdQueryOptions = (id: string | number) =>
  queryOptions({
    queryKey: acTypeKeys.detail(id),
    queryFn: () => getAcType(id),
    staleTime: 1000 * 60 * 5,
  });
