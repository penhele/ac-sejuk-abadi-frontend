import { getArticle } from "@/services/article.service";

import { queryOptions } from "@tanstack/react-query";

export const getArticlesQueryOptions = () =>
  queryOptions({
    queryKey: ["articles"],
    queryFn: getArticle,
    staleTime: 1000 * 60 * 5,
  });
