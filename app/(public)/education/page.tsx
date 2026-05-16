import EducationPage from "@/components/pages/education/education-page";
import HeroSection from "@/components/sections/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
};

export default function page() {
  return (
    <main>
      <HeroSection
        title="Articles"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, accusamus."
      />

      <div className="max-w-7xl mx-auto py-4 px-page-inline xl:px-0">
        <EducationPage />
      </div>
    </main>
  );
}
