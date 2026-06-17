import { Product } from "@/features/product/types/product";
import ProductBadge from "../badges/product-badge";

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-between-items-xs">
        <div className="">
          <span className="text-xs text-gray-400">{product.brand.name}</span>
          <h1>{product.name}</h1>
        </div>

        <ProductBadge product={product} />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-header-h4 font-medium">Deskripsi</h1>
<<<<<<< HEAD
        <p className="text-body min-h-20 md:min-h-80">{product.description}</p>
=======
        <p className="text-body min-h-20 xs:min-h-80">{product.description}</p>
>>>>>>> a48fc63b33cef8bb70f3e7dd456e65181a42407b
      </div>
    </div>
  );
}
