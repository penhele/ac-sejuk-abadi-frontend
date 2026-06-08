import ProjectPage from "@/components/pages/public/project/project-page";
import HeroSection from "@/components/sections/hero-section";
import { Briefcase } from "lucide-react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portofolio",
};

export default function page() {
  return (
    <div className="space-y-between-items-lg">
      <HeroSection
        title="Karya Terbaik Kami"
        description="Jelajahi berbagai proyek instalasi dan perawatan AC yang telah kami selesaikan dengan standar kualitas tinggi."
        Icon={Briefcase}
        IconLabel="Portofolio"
      />

      <ProjectPage />
    </div>
  );
}
