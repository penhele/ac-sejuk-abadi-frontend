import { useQuery } from "@tanstack/react-query";
import {
  getAcTypeByIdQueryOptions,
  getAcTypesQueryOptions,
} from "../queries/ac-type-queries";

export default function useAcType(id: string | number) {
  return useQuery(getAcTypeByIdQueryOptions(id));
}
