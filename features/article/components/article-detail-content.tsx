import BreadcrumbComponent from "@/components/breadcrumb-component";
import { useArticle } from "../hooks/use-article";
import { useArticles } from "../hooks/use-articles";
import ArticleContent from "./article-content";

type Props = {
  id: string;
};

export default function ArticleDetailContent({ id }: Props) {
  const { data: article } = useArticle(id);
  const { data: articles } = useArticles();

  if (!article || !articles) {
    return <span>loading...</span>;
  }

  return (
    <div className="space-y-between-items-sm">
      <BreadcrumbComponent />

      <div className="grid grid-cols-3 gap-8">
        <ArticleContent
          title={article.name}
          category={article.category}
          content={article.description}
          createdAt={article.created_at}
          className="col-span-2"
        />

        <aside>
          <div className="space-y-4">
            <h1 className="text-lg font-semibold">Artikel Lainnya</h1>

            <div className="flex flex-col space-y-between-items-lg">
              {articles.map((article) => (
                <div key={article.id} className="space-y-2">
                  <div className="relative">
                    <div className="aspect-video bg-muted rounded-lg"></div>
                    <span className="absolute top-4 left-4 text-xs px-2 py-1 bg-card rounded-card">
                      {article.category}
                    </span>
                  </div>
                  <h1 className="font-semibold">{article.name}</h1>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {article.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
