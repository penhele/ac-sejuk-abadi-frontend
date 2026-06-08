import { useQuery } from "@tanstack/react-query";
import { getArticlesQueryOptions } from "../queries/article-queries";

export const useArticles = () => {
  return useQuery(getArticlesQueryOptions());
};
