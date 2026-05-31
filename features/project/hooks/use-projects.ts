import { useQuery } from "@tanstack/react-query";
import { getProjectsQueryOptions } from "..";

export function useProjects() {
  return useQuery(getProjectsQueryOptions());
}
