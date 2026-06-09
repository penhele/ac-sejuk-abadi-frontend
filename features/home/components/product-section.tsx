import ErrorFallback from "@/components/fallback/error-fallback";
import ProductGrid from "@/features/product/components/product-grid";
import { Header } from "@/components/header";
import { ROUTES } from "@/constants/routes";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function ProductSection() {
  return (
    <div className="">
      <Header title="Produk" href={ROUTES.SHOP} />

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense>
          <ProductGrid length={10} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
