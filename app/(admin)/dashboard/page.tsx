import DashboardPage from "@/components/pages/dashboard/dashboard-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function page() {
  return <DashboardPage />;
}
