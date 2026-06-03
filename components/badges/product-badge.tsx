import { Product } from "@/types/product";
import AcProductTypeBadge from "./ac-type-badge";
import CategoryBadge from "./category-badge";
import PkBadge from "./pk-badge";

export default function ProductBadge({ product }: { product: Product }) {
  return (
    <div className="flex gap-2 flex-wrap h-full items-end">
      <PkBadge pk={product.pk} />
      <AcProductTypeBadge acType={product.ac_type.name} />
      <CategoryBadge category={product.category.name} />
    </div>
  );
}
