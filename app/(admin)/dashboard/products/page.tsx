import ProductPage from "@/components/pages/dashboard/product/product-page";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <ProductPage />
    </Suspense>
  );
}
