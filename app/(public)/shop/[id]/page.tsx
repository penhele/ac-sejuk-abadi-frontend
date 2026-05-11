import ProductDetailPage from "@/components/pages/shop/product-detail-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default function page() {
  return (
    <div className="max-w-7xl mx-auto py-default-page">
      <ProductDetailPage />
    </div>
  );
}
