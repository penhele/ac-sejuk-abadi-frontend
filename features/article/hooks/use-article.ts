import { useQuery } from "@tanstack/react-query";
import { getArticleByIdQueryOptions } from "../queries/article-queries";

export const useArticle = (id: string | number) => {
  return useQuery(getArticleByIdQueryOptions(id));
};
