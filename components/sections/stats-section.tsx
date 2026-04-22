import { getBrands } from "@/services/brand.service";
import { ShieldCheck } from "lucide-react";
import { Separator } from "../ui/separator";
import { getProjects } from "@/services/project.service";
import { getProducts } from "@/services/product.service";

export default async function StatsSection() {
  const brands = await getBrands();
  const projects = await getProjects();
  const products = await getProducts();

  const statsList = [
    { label: "Project", value: projects.length },
    { label: "Brand", value: brands.length },
    { label: "Brand", value: products.data.length },
  ];

  return (
    <div className="flex justify-evenly bg-primary py-8 rounded-lg">
      {statsList.map((stats, index) => (
        <>
          <div key={index} className="flex flex-col items-center space-y-2">
            <span className="text-3xl font-bold text-white">
              {stats.value}+
            </span>
            <span className="text-white">{stats.label}</span>
          </div>

          {index < statsList.length - 1 && <Separator orientation="vertical" />}
        </>
      ))}
    </div>
  );
}
