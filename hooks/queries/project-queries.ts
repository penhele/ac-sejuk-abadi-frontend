import { getProjects } from "@/services/project.service";
import { queryOptions } from "@tanstack/react-query";

export const getProjectsQueryOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5,
  });
