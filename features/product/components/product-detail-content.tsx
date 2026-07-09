import MarkdownRenderer from "@/components/markdown-renderer";
import ProductImages from "@/components/product/product-images";
import ProductInfo from "@/components/product/product-info";
import ProductPriceAction from "@/components/product/product-price-action";
import { ROUTES } from "@/constants/routes";
import { useProduct } from "@/features/product";
import ProductFallback from "@/features/product/components/product-fallback";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../../components/fallback/error-fallback";
import { HeaderSection } from "../../../components/util/header";
import CarouselProduct from "./carousel-product";

export default function ProductDetailContent({ id }: { id: string }) {
  const { data: product, isLoading } = useProduct(id);

  if (isLoading) {
    return <ProductFallback length={8} />;
  }

  if (!product) {
    return <ErrorFallback />;
  }

  return (
    <div className="space-y-between-section">
      <div className="grid grid-cols-2 gap-between-items-lg">
        <ProductImages product={product} className="col-span-2 md:col-span-1" />

        <div className="flex flex-col gap-8 col-span-2 md:col-span-1">
          <ProductInfo product={product} />

          <ProductPriceAction product={product} />
        </div>
      </div>

      <div className="">
        <HeaderSection title="Deskripsi" />

        <MarkdownRenderer
          text={product.description || "Tidak ada deskripsi."}
        />
      </div>

      <div className="">
        <HeaderSection
          title="Produk Serupa"
          href={`${ROUTES.SHOP}?id_category=${product?.id_category}&id_ac_type=${product?.id_ac_type}`}
        />

        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<ProductFallback length={4} />}>
            <CarouselProduct
              limit={6}
              params={{
                id_ac_type: product?.id_ac_type,
                id_category: product?.id_category,
              }}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
