import { getBrands } from "@/services/brand.service";
import BrandFilter from "./brand-filter";
import PriceFilter from "./price-filter";
import { useQuery } from "@tanstack/react-query";

export default function ShopFilter() {
  const { data: response } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const brands = response || [];

  return (
    <aside className="w-3xs sticky md:top-20 space-y-4">
      <h1 className="text-lg font-bold">Filter Products</h1>

      <div className="flex flex-col space-y-8 border rounded-lg p-4">
        <BrandFilter brands={brands} />

        <PriceFilter />
      </div>
    </aside>
  );
}
