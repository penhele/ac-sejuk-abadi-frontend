import { useQuery } from "@tanstack/react-query";
import { getCategoryByIdQUeryOptions } from "../queries/category-queries";

export default function useCategory(id: string | number) {
  return useQuery(getCategoryByIdQUeryOptions(id));
}
