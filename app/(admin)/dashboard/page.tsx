import DashboardPage from "@/components/pages/dashboard/home/dashboard-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function page() {
  return <DashboardPage />;
}
