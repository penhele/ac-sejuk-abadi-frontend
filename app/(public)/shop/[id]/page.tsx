import ProductDetailPage from "@/features/product/components/product-detail-page";
import { getProductById } from "@/features/product";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

<<<<<<< HEAD
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  try {
    const product = await getProductById(id);
    const images =
      product.images && product.images.length > 0
        ? [product.images[0].image_url]
        : [];
    return {
      title: `${product.name} | AC Sejuk Abadi`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images,
      },
    };
  } catch (error) {
    return {
      title: "Produk Tidak Ditemukan | AC Sejuk Abadi",
      description: "Produk yang Anda cari tidak ditemukan.",
    };
  }
}

export default function page() {
  return <ProductDetailPage />;
=======
export default function page() {
  return (
    <div className="max-w-7xl mx-auto py-default-page px-page-inline xl:px-0">
      <ProductDetailPage />
    </div>
  );
>>>>>>> a48fc63b33cef8bb70f3e7dd456e65181a42407b
}
