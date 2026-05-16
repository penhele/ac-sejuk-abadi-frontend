import { cn } from "@/lib/utils";
import BrandFilter from "./brand-filter";
import RangePriceFilter from "./range-price-filter";

export default function ShopFilter({ className }: { className?: string }) {
  return (
    <aside className={cn("w-3xs sticky md:top-20 space-y-4", className)}>
      <h1 className="text-lg font-bold">Filter Produk</h1>

      <div className="flex flex-col space-y-8 border rounded-lg p-4">
        <BrandFilter />

        <RangePriceFilter />
      </div>
    </aside>
  );
}
