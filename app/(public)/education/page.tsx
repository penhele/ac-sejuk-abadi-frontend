import EducationPage from "@/components/pages/public/education/education-page";
import HeroSection from "@/components/sections/hero-section";
import { Book } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
};

export default function page() {
  return (
    <div className="space-y-between-section">
      <HeroSection
        title="Articles"
        description="Kenali HVAC dari sini"
        Icon={Book}
        IconLabel="Artikel"
      />

      <EducationPage />
    </div>
  );
}
