import { useQuery } from "@tanstack/react-query";
import { getMeQueryOptions } from "../queries/me-queries";

export const useMe = () => {
  return useQuery(getMeQueryOptions());
};
