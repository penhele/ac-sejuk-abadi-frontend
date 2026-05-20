import { cn } from "@/lib/utils";
import BrandFilter from "./brand-filter";
import RangePriceFilter from "./range-price-filter";
import TypeFilter from "./type-filter";
import CategoryFilter from "./category-filter";

export default function ShopFilter({ className }: { className?: string }) {
  return (
    <aside className={cn("w-3xs sticky md:top-8 space-y-4", className)}>
      <h1 className="text-lg font-bold">Filter Produk</h1>

      <div className="flex flex-col space-y-2 border rounded-lg p-4">
        <BrandFilter />

        <TypeFilter />

        <CategoryFilter />

        <RangePriceFilter />
      </div>
    </aside>
  );
}
