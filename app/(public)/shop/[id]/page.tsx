import ProductDetailPage from "@/components/pages/shop/product-detail-page";
import { getProductById } from "@/services/product.service";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

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
}
