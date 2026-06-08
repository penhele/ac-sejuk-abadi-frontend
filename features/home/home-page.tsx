import AboutSection from "./components/about-section";
import ProductSection from "./components/product-section";
import ProjectSection from "./components/project-section";

export default function HomePage() {
  return (
    <div className="space-y-between-section">
      <AboutSection />

      <ProjectSection />

      <ProductSection />
    </div>
  );
}
