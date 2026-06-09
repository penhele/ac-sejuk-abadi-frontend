import BreadcrumbComponent from "@/components/breadcrumb-component";
import ArticleFallback from "@/features/article/components/article-fallback";
import ErrorFallback from "@/components/fallback/error-fallback";
import ArticleGrid from "@/features/article/components/article-grid";
import { getArticlesQueryOptions } from "@/features/article/queries/article-queries";
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
