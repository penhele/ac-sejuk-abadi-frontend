import { getBrands } from "@/services/brand.service";
import { getProducts } from "@/services/product.service";
import { getProjects } from "@/services/project.service";
import { Separator } from "../ui/separator";

export default async function StatsSection() {
  const brands = await getBrands();
  const projects = await getProjects();
  const products = await getProducts();

  const statsList = [
    { label: "Project", value: projects.length },
    { label: "Brand", value: brands.length },
    { label: "Product", value: products.data.length },
  ];

  return (
    <div className="flex justify-evenly bg-primary py-8 rounded-lg">
      {statsList.map((stats, index) => (
        <div key={index}>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-3xl font-bold text-white">
              {stats.value}+
            </span>
            <span className="text-white">{stats.label}</span>
          </div>

          {index < statsList.length - 1 && (
            <Separator className="text-white" orientation="vertical" />
          )}
        </div>
      ))}
    </div>
  );
}
