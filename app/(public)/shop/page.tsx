import ShopPage from "@/components/pages/shop/shop-page";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ id_brand?: string }>;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-default-page">
        <ShopPage searchParams={searchParams} />
      </div>
    </div>
  );
}
