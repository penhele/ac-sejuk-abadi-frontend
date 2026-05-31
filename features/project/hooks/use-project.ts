import { useQuery } from "@tanstack/react-query";
import { getProjectByIdQueryOptions } from "..";

export function useProject(id: string | number) {
  return useQuery(getProjectByIdQueryOptions(id));
}
