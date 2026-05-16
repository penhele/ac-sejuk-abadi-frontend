import ShopPage from "@/components/pages/shop/shop-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto py-default-page px-page-inline xl:px-0">
      <ShopPage />
    </div>
  );
}
