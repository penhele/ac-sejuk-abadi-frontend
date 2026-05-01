import ProjectPage from "@/components/pages/portofolio/project-page";
import HeroSection from "@/components/sections/hero-section";

export default function page() {
  return (
    <div className="">
      <HeroSection
        title="Projects"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, sapiente!"
      />

      <div className="max-w-7xl mx-auto">
        <div className="py-default-page">
          <ProjectPage />
        </div>
      </div>
    </div>
  );
}
