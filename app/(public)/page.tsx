import HomePage from "@/components/pages/home/home-page";
import { getBrands } from "@/services/brand.service";
import { getProducts } from "@/services/product.service";
import { getProjects } from "@/services/project.service";

export default async function page() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-default-page">
        <HomePage />
      </div>
    </div>
  );
}
