import BreadcrumbComponent from "@/components/breadcrumb-component";
import ErrorFallback from "@/components/fallback/error-fallback";
import ArticleGrid from "@/components/grid/article-grid";
import ArticleCardSkeleton from "@/components/skeletons/article-card-skeleton";
import getArticlesQueryOptions from "@/hooks/queries/artcile-queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function EducationPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getArticlesQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-between-section">
        <BreadcrumbComponent />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense
            fallback={
              <div className="grid grid-cols-3 gap-between-card">
                {[...Array(6)].map((_, index) => (
                  <ArticleCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <ArticleGrid />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrationBoundary>
  );
}
