import { useQuery } from "@tanstack/react-query";
import { getCategoriesQueryOptions } from "../queries/category-queries";

export default function useCategories() {
  return useQuery(getCategoriesQueryOptions());
}
