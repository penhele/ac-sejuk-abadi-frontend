import ErrorFallback from "@/components/fallback/error-fallback";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardProductDetailPage from "@/features/product/components/dashboard-product-detail-page";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Skeleton />}>
        <DashboardProductDetailPage id={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
