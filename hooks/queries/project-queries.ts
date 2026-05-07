import { getProjects } from "@/services/project.service";
import { queryOptions } from "@tanstack/react-query";

export default function getProjectsQueryOptions() {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getProjects,
  });
}
