import { getArticle } from "@/services/article.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import ArticleCard from "../cards/article-card";

export default function ArticleGrid() {
  const { data: articles } = useSuspenseQuery({
    queryKey: ["articles"],
    queryFn: getArticle,
  });

  return (
    <div className="grid grid-cols-3 gap-between-card">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
