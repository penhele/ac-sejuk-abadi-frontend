import ProductPage from "@/features/product/components/product-page";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <ProductPage />
    </Suspense>
  );
}
