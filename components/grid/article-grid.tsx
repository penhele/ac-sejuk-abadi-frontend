"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import ArticleCard from "../cards/article-card";
import getArticlesQueryOptions from "@/hooks/queries/artcile-queries";

export default function ArticleGrid() {
  const { data: articles } = useSuspenseQuery(getArticlesQueryOptions());

  return (
    <div className="grid grid-cols-3 gap-between-card">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
