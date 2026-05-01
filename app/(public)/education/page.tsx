import EducationPage from "@/components/pages/education/education-page";
import HeroSection from "@/components/sections/hero-section";

export default function page() {
  return (
    <main>
      <HeroSection
        title="Articles"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, accusamus."
      />

      <div className="max-w-7xl mx-auto py-4">
        <EducationPage />
      </div>
    </main>
  );
}
