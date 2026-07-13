import UploadProductImagesPage from "@/features/product/components/upload-product-images-page";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <UploadProductImagesPage id={id} />;
}
