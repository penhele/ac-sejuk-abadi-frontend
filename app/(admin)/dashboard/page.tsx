import DashboardPage from "@/features/dashboard/dashboard-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function page() {
  return <DashboardPage />;
}
