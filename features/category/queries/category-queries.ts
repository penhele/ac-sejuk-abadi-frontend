import { getCategories } from "@/features/category/api/get-categories";
import { queryOptions } from "@tanstack/react-query";
import { categoryKeys } from "./category-keys";
import { updateCategory } from "../api/update-category";
import { getCategory } from "../api/get-category";

export const getCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });

export const getCategoryByIdQUeryOptions = (id: string | number) =>
  queryOptions({
    queryKey: ["categories", id],
    queryFn: () => getCategory(id),
    staleTime: 1000 * 60 * 5,
  });
