import { getArticles } from "@/features/article/api/get-articles";
import { queryOptions } from "@tanstack/react-query";
import { articleKeys } from "./article-keys";
import { getArticle } from "../api/get-article";

export const getArticlesQueryOptions = () =>
  queryOptions({
    queryKey: articleKeys.all,
    queryFn: getArticles,
    staleTime: 1000 * 60 * 5,
  });

export const getArticleByIdQueryOptions = (id: string | number) =>
  queryOptions({
    queryKey: articleKeys.detail(id),
    queryFn: () => getArticle(id),
    staleTime: 1000 * 60 * 5,
  });
