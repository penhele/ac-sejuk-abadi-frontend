import ShopPage from "@/components/pages/shop/shop-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default function Page() {
  return (
    <div className="">
      <ShopPage />
    </div>
  );
}
