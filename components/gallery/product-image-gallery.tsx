import { useQuery } from "@tanstack/react-query";
import ProductImagePage from "../pages/dashboard/product/product-image-page";
import { getProductById } from "@/services/product.service";
import { getProductByIdQueryOptions } from "@/hooks/queries/product-queries";

export default function ProductImageGallery({ id }: { id: string }) {
  const {} = useQuery(getProductByIdQueryOptions(id));

  return (
    <div className="grid grid-cols-5 gap-between-card">
      <div className="bg-muted aspect-square"></div>
      <div className="bg-muted aspect-square"></div>
      <div className="bg-muted aspect-square"></div>
      <div className="bg-muted aspect-square"></div>
      <div className="bg-muted aspect-square"></div>
    </div>
  );
}
