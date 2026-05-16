import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import ProductCard from "../cards/product-card";

export default function ProductList({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 gap-between-card",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
