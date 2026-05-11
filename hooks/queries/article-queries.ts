import { getArticle } from "@/services/article.service";

import { queryOptions } from "@tanstack/react-query";

export default function getArticlesQueryOptions() {
  return queryOptions({
    queryKey: ["articles"],
    queryFn: getArticle,
    staleTime: 1000 * 60 * 5,
  });
}
