import AboutUsPage from "@/components/pages/about-us/about-us-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function page() {
  return (
    <div className="max-w-7xl mx-auto">
      <AboutUsPage />
    </div>
  );
}
