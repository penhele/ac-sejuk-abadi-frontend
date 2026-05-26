import HomePage from "@/components/pages/public/home/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Page() {
  return <HomePage />;
}
