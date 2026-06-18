import ArticleCardSkeleton from "./article-card-skeleton";

export default function ArticleFallback() {
  return (
    <div className="grid grid-cols-3 gap-between-card">
      {Array.from({ length: 6 }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}
