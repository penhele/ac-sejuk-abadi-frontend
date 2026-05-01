"use client";

import BreadcrumbComponent from "@/components/breadcrumb-component";
import ErrorFallback from "@/components/fallback/error-fallback";
import ArticleGrid from "@/components/grid/article-grid";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function EducationPage() {
  return (
    <div className="space-y-between-section">
      <BreadcrumbComponent />

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense>
          <ArticleGrid />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
