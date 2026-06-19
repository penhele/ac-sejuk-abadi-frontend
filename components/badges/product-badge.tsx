import { Product } from "@/features/product";
import AcProductTypeBadge from "../../features/acType/components/ac-type-badge";
import CategoryBadge from "./category-badge";

export default function ProductBadge({ product }: { product: Product }) {
  return (
    <div className="flex gap-2 flex-wrap items-end">
      {product.id_ac_type && (
        <AcProductTypeBadge acType={product.ac_type.name} />
      )}

      {product.id_category && (
        <CategoryBadge category={product.category.name} />
      )}
    </div>
  );
}
