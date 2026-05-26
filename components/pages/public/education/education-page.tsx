import BreadcrumbComponent from "@/components/breadcrumb-component";
import ArticleFallback from "@/components/fallback/article-fallback";
import ErrorFallback from "@/components/fallback/error-fallback";
import ArticleGrid from "@/components/grid/article-grid";
import { getArticlesQueryOptions } from "@/hooks/queries/article-queries";
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
          <Suspense fallback={<ArticleFallback />}>
            <ArticleGrid />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrationBoundary>
  );
}
