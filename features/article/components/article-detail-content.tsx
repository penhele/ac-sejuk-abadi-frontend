import BreadcrumbComponent from "@/components/breadcrumb-component";
import { useArticle } from "../hooks/use-article";
import { useArticles } from "../hooks/use-articles";
import ArticleContent from "./article-content";
import ArticleCard from "./article-card";
import ArticleContentSkeleton from "./article-content-skeleton";
import ArticleCardSkeleton from "./article-card-skeleton";

type Props = {
  id: string;
};

export default function ArticleDetailContent({ id }: Props) {
  const { data: article } = useArticle(id);
  const { data: articles } = useArticles();

  return (
    <div className="space-y-between-items-sm">
      <BreadcrumbComponent />

      <div className="grid grid-cols-3 gap-8">
        {!article ? (
          <ArticleContentSkeleton className="col-span-2" />
        ) : (
          <ArticleContent
            title={article.name}
            category={article.category}
            content={article.description}
            createdAt={article.created_at}
            className="col-span-2"
            imageUrl={
              article.images.length > 0
                ? article.images[0].image_url
                : undefined
            }
          />
        )}

        <aside>
          <div className="space-y-4">
            <h1 className="text-lg font-semibold">Artikel Lainnya</h1>

            {!articles ? (
              <div className="space-y-between-items-lg">
                {Array.from({ length: 2 }).map((_, index) => (
                  <ArticleCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-between-items-lg">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
