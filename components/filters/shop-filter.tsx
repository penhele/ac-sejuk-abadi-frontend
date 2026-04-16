import { getBrands } from "@/services/brand.service";
import BrandFilter from "./brand-filter";
import PriceFilter from "./price-filter";

export default async function ShopFilter() {
  const brands = await getBrands();

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
