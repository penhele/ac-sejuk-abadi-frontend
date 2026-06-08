import { queryOptions } from "@tanstack/react-query";
import { getMe } from "../api/get-me";
import { meKeys } from "./me-keys";

export const getMeQueryOptions = () => {
  return queryOptions({
    queryFn: getMe,
    queryKey: meKeys.me,
    staleTime: 1000 * 60 * 5,
  });
};
