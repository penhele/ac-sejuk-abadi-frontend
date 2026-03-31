import { cn } from "@/lib/utils";
import ProductCard from "../cards/product-card";
import { ProductType } from "@/types/product";

export default function ProductList({
  products,
  className,
}: {
  products: ProductType[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
