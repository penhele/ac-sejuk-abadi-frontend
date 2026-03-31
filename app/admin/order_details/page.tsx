import { OrderHeader } from "@/components/admin/orders/detail/order-header";
import { OrderItems } from "@/components/admin/orders/detail/order-items";
import { CustomerInfo } from "@/components/admin/orders/detail/customer-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, CreditCard, Badge } from "lucide-react";

export default function OrderDetailPage() {
  // Nanti data ini diambil dari API berdasarkan ID
  const orderData = {
    id: "ORD-2026-9901",
    status: "Diproses",
    date: "17 Maret 2026, 14:20 WIB",
    items: [{ id: "1", name: "AC Panasonic 1 PK", category: "AC", quantity: 1, price: 4250000 }],
    customer: { id: "CUST-442", name: "Agung Saputra", email: "agung@example.com", phone: "+62 812-3456-7890", address: "Jl. Margonda Raya No. 100, Depok" },
    payment: { method: "Transfer Bank (BCA)", status: "Lunas", total: 4250000 }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <OrderHeader orderId={orderData.id} status={orderData.status} date={orderData.date} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OrderItems items={orderData.items} total={orderData.payment.total} />
          
          {/* Timeline Tracking (Bisa dipisah juga jika kompleks) */}
          <Card className="border-none shadow-sm dark:bg-slate-900">
             <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Truck size={18} className="text-blue-500" /> Pelacakan</CardTitle></CardHeader>
             <CardContent className="relative pl-8 space-y-4 before:absolute before:left-4 before:h-full before:w-0.5 before:bg-slate-200">
                <div className="relative">
                  <div className="absolute -left-6 w-4 h-4 rounded-full bg-blue-600 border-4 border-white" />
                  <p className="text-sm font-bold">Pesanan Diproses</p>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <CustomerInfo customer={orderData.customer} />
          
          {/* Payment Info */}
          <Card className="border-none shadow-sm dark:bg-slate-900">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CreditCard size={18} className="text-green-500" /> Pembayaran</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm"><span>Metode</span><span className="font-medium">{orderData.payment.method}</span></div>
              <div className="flex justify-between text-sm"><span>Status</span><Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">{orderData.payment.status}</Badge></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}