import useCategories from "@/features/category/hooks/use-categories";
import { useMemo } from "react";
import createCategoryChart from "../utils/category-chart";

export const useCategoryChart = () => {
  const { data: categories = [] } = useCategories();

  return useMemo(() => {
    return createCategoryChart(categories);
  }, [categories]);
};
