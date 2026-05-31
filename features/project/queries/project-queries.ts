import { queryOptions } from "@tanstack/react-query";
import { getProjectById, getProjects, projectKeys } from "..";

export const getProjectsQueryOptions = () =>
  queryOptions({
    queryKey: projectKeys.lists(),
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5,
  });

export const getProjectByIdQueryOptions = (id: string | number) =>
  queryOptions({
    queryKey: projectKeys.detail(id),
    queryFn: () => getProjectById(id),
    staleTime: 1000 * 60 * 5,
  });
