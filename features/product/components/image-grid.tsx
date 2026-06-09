import {
  deleteProductImage,
  productKeys,
  useProduct,
} from "@/features/product";
import Image from "next/image";
import DeleteImageButton from "../../../components/buttons/delete-image-button";

export default function ImageGrid({ id }: { id: string }) {
  const { data: products } = useProduct(id);

  return (
    <div className="grid grid-cols-4 gap-between-card">
      {products?.images.length ? (
        <>
          {products.images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square bg-muted/50 rounded-sm border border-dashed"
            >
              <Image
                src={image.image_url}
                alt={products.name}
                fill
                className="object-contain"
              />

              <DeleteImageButton
                className="opacity-0 group-hover:opacity-100 absolute top-2 right-2"
                mutationFn={() => deleteProductImage(id, image.id)}
                queryKey={productKeys.all}
              />
            </div>
          ))}
        </>
      ) : (
        <div className="aspect-square bg-muted/50 rounded-sm border border-dashed flex items-center justify-center">
          <span>No Images.</span>
        </div>
      )}
    </div>
  );
}
