import { cn } from "@/lib/utils";
import ProductCard from "../cards/product-card";

export default function ProductList({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {Array.from({ length: 4 }).map((_, index) => (
        <ProductCard key={index} id="qwertyuiop" />
      ))}
    </div>
  );
}
