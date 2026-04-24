"use client";

import ErrorFallback from "@/components/fallback/error-fallback";
import CartGrid from "@/components/grid/cart-grid";
import { HeaderSection } from "@/components/util/header";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function CartPage() {
  return (
    <div className="">
      <HeaderSection title="Cart" />

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense>
          <CartGrid />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
