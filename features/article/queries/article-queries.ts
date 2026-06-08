import { getArticles } from "@/features/article/api/get-articles";
import { queryOptions } from "@tanstack/react-query";
import { articleKeys } from "./article-keys";

export const getArticlesQueryOptions = () =>
  queryOptions({
    queryKey: articleKeys.all,
    queryFn: getArticles,
    staleTime: 1000 * 60 * 5,
  });
