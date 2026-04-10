import { cn } from "@/lib/utils";
import ProductCard from "../cards/product-card";
import { Product } from "@/types/product";

export default function ProductList({
  products,
  className,
  limit,
}: {
  products: Product[];
  className?: string;
  limit?: number;
}) {
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div
      className={cn(
        "grid grid-cols-2 lg:grid-cols-4 gap-between-card",
        className,
      )}
    >
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
