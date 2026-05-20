"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import ArticleCard from "../cards/article-card";
import { getArticlesQueryOptions } from "@/hooks/queries/article-queries";
import ArticleFallback from "../fallback/article-fallback";
import EmptyState from "../empty-state/empty-state";
import { SearchX } from "lucide-react";

export default function ArticleGrid() {
  const { data: articles, isFetching } = useQuery(getArticlesQueryOptions());

  if (isFetching) {
    return <ArticleFallback />;
  }

  if (!articles?.length) {
    return <EmptyState Icon={SearchX} label="No artciles found" />;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-between-card">
      {articles?.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
