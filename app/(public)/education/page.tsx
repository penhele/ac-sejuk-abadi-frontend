import EducationPage from "@/features/article/components/education-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
};

export default function page() {
  return <EducationPage />;
}
