import BrandDetailPage from "@/components/pages/brand/brand-detail-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand",
};

export default function page() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-8">
        <BrandDetailPage />
      </div>
    </div>
  );
}
