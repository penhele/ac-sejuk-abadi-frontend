import { cn } from "@/lib/utils";
import ProductCard from "../cards/product-card";
import { ProductType } from "@/types/product";

export default function ProductList({
  products,
  className,
  limit,
}: {
  products: ProductType[];
  className?: string;
  limit?: number;
}) {
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
