import HomePage from "@/components/pages/home/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Page() {
  return (
    <div className="max-w-7xl mx-auto py-default-page px-page-inline xl:px-0">
      <HomePage />
    </div>
  );
}
