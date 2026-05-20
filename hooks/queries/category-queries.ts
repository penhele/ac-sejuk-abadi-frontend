import { getCategories } from "@/services/category.service";
import { queryOptions } from "@tanstack/react-query";

export const getCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["category"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });
