import ErrorFallback from "@/components/fallback/error-fallback";
import WishlistGrid from "@/components/grid/wistlist-grid";
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton";
import { HeaderSection } from "@/components/util/header";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function WishlistPage() {
  return (
    <div className="">
      <div className="">
        <HeaderSection title="My Wishlist" />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense
            fallback={
              <div className="grid grid-cols-4 gap-between-card">
                {[...Array(4)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <WishlistGrid />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
