import AboutSection from "./components/about-section";
import ProductSection from "./components/product-section";

export default function HomePage() {
  return (
    <div className="space-y-between-section">
      <AboutSection />

      <ProductSection />
    </div>
  );
}
