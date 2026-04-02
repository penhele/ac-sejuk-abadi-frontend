import { OrderDetailClient } from "@/components/admin/orders/detail/order-detail-client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: PageProps) {
  // Di sini nantinya kamu bisa melakukan fetching data server-side jika diperlukan
  // const order = await getOrderById(params.id);

  return <OrderDetailClient orderId={params.id} />;
}