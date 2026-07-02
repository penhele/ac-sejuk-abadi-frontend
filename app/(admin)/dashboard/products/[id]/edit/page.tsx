import EditProductPage from "@/features/product/components/edit-product-page";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <EditProductPage id={id} />;
}
