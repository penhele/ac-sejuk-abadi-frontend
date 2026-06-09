import PortofolioDetailPage from "@/features/project/components/project-detail-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio",
};

export default function page() {
  return <PortofolioDetailPage />;
}
