import EducationPage from "@/components/pages/education/education-page";
import HeroSection from "@/components/sections/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
};

export default function page() {
  return (
    <div className="space-y-between-section">
      <HeroSection
        title="Articles"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, accusamus."
      />

      <EducationPage />
    </div>
  );
}
