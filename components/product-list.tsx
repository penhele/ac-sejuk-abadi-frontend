import ProductCard from "./product-card";

export default function ProductList() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard key={index} id="qwertyuiop" />
      ))}
    </div>
  );
}
