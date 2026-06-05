import { useQuery } from "@tanstack/react-query";
import { getAcTypesQueryOptions } from "../queries/ac-type-queries";

export default function useAcTypes() {
  return useQuery(getAcTypesQueryOptions());
}
