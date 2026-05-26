import PortofolioDetailPage from "@/components/pages/public/portofolio/project-detail-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio",
};

export default function page() {
  return <PortofolioDetailPage />;
}
