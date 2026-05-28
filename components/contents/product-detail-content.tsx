import ProductImages from "@/components/product/product-images";
import ProductInfo from "@/components/product/product-info";
import ProductPriceAction from "@/components/product/product-price-action";
import { ROUTES } from "@/constants/routes";
import { getProductById } from "@/services/product.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CarouselProduct from "../carousel/carousel-product";
import ErrorFallback from "../fallback/error-fallback";
import ProductFallback from "../fallback/product-fallback";
import { HeaderSection } from "../util/header";

export default function ProductDetailContent({ id }: { id: string }) {
  const { data: product } = useSuspenseQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
  });

  return (
    <div className="space-y-between-section">
      <div className="grid grid-cols-2 gap-4">
        <ProductImages product={product} className="col-span-2 md:col-span-1" />

        <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
          <ProductInfo product={product} />

          <ProductPriceAction product={product} />
        </div>
      </div>
      <div className="">
        <HeaderSection
          title="Produk Serupa"
          href={`${ROUTES.SHOP}?id_category=${product.id_category}&id_ac_type=${product.id_ac_type}`}
        />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<ProductFallback length={4} />}>
            <CarouselProduct
              limit={6}
              params={{
                id_ac_type: product.id_ac_type,
                id_category: product.id_category,
              }}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
