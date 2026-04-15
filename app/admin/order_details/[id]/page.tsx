import { OrderDetailClient } from "@/components/admin/orders/detail/order-detail-client";

export const metadata = {
  title: "Detail Pesanan | AC Sejuk Abadi",
  description: "Halaman rincian transaksi pelanggan",
};

export default function Page({ params }: { params: { id: string } }) {
  return <OrderDetailClient orderId={params.id} />;
}