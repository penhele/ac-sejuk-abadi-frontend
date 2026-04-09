import { Product } from "@/types/product";

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <div className="">
          <span className="text-xs text-gray-400">{product.brand.name}</span>
          <h1>{product.name}</h1>
        </div>

        <div className="flex gap-2">
          <div className="text-xs bg-gray-800 text-white py-1 px-2 rounded-sm">
            {product.pk} PK
          </div>
          <div className="text-xs bg-green-800 text-white py-1 px-2 rounded-sm">
            {product.type}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-1">
        <h1 className="text-header-h4 font-medium">Deskripsi</h1>
        <p className="text-body min-h-80">{product.description}</p>
      </div>
    </div>
  );
}
