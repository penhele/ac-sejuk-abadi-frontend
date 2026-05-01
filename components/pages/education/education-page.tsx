"use client";

import ErrorFallback from "@/components/fallback/error-fallback";
import ArticleGrid from "@/components/grid/article-grid";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function EducationPage() {
  return (
    <div className="">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense>
          <ArticleGrid />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
