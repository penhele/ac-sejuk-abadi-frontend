import ProductDetailPage from "@/components/pages/shop/product-detail-page";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-4">
        <ProductDetailPage />
      </div>
    </div>
  );
}
