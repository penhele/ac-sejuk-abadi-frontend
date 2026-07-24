import PushButton from "@/components/buttons/push-button";
import { ROUTES } from "@/constants/routes";
import UploadProductImagesForm from "./upload-product-images-form";
import ProductImageGallery from "./product-image-gallery";

interface Props {
  id: string;
}

export default function UploadProductImagesPage({ id }: Props) {
  return (
    <div className="space-y-between-items">
      <PushButton route={ROUTES.PRODUCTS} label="Back to Product Page" />

      <div className="grid grid-cols-2 gap-between-card">
        <UploadProductImagesForm id={id} />

        <ProductImageGallery id={id} />
      </div>
    </div>
  );
}
