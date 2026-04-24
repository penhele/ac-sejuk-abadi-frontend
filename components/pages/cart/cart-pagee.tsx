import CartSummary from "@/components/cart-summary";
import ErrorFallback from "@/components/fallback/error-fallback";
import CartGrid from "@/components/grid/cart-grid";
import { HeaderSection } from "@/components/util/header";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function CartPage() {
  return (
    <div className="space-y-between-section">
      <HeaderSection title="Cart" />

      <div className="flex flex-row gap-8 h-fit">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense>
            <CartGrid className="flex-1" />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense>
            <CartSummary />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
