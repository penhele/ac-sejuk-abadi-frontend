import ProjectPage from "@/components/pages/public/portofolio/project-page";
import HeroSection from "@/components/sections/hero-section";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portofolio",
};

export default function page() {
  return (
    <div className="space-y-between-section">
      <HeroSection
        title="Projects"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, sapiente!"
      />

      <ProjectPage />
    </div>
  );
}
