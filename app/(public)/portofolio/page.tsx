import ProjectPage from "@/features/project/components/project-page";
import HeroSection from "@/components/sections/hero-section";
import { Briefcase } from "lucide-react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portofolio",
};

export default function page() {
  return <ProjectPage />;
}
