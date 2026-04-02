"use client";

import React from "react";
import { OrderHeader } from "@/components/admin/orders/detail/order-header";
import { OrderItems } from "@/components/admin/orders/detail/order-items";
import { CustomerInfo } from "@/components/admin/orders/detail/customer-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, CreditCard } from "lucide-react";

interface OrderDetailClientProps {
  orderId: string;
}

export function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  // Simulasi data (Nanti bisa menggunakan React Query atau useEffect untuk fetch berdasarkan orderId)
  const orderData = {
    id: orderId,
    status: "Diproses",
    date: "17 Maret 2026, 14:20 WIB",
    items: [
      { id: "1", name: "AC Panasonic 1 PK", category: "AC", quantity: 1, price: 4250000 }
    ],
    customer: { 
      id: "CUST-442", 
      name: "Agung Saputra", 
      email: "agung@example.com", 
      phone: "+62 812-3456-7890", 
      address: "Jl. Margonda Raya No. 100, Depok" 
    },
    payment: { 
      method: "Transfer Bank (BCA)", 
      status: "Lunas", 
      total: 4250000 
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <OrderHeader 
        orderId={orderData.id} 
        status={orderData.status} 
        date={orderData.date} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI: ITEMS & TRACKING */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItems 
            items={orderData.items} 
            total={orderData.payment.total} 
          />
          
          <Card className="border-none shadow-sm dark:bg-slate-900 overflow-hidden">
            <CardHeader className="border-b dark:border-slate-800">
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck size={18} className="text-blue-500" /> 
                Pelacakan Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 relative">
              {/* Garis Timeline */}
              <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-200 dark:bg-slate-800" />
              
              <div className="space-y-8">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-blue-100 dark:border-blue-900 z-10" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Pesanan Diproses</p>
                    <p className="text-xs text-muted-foreground">{orderData.date}</p>
                  </div>
                </div>
                {/* Kamu bisa menambah status timeline lainnya di sini */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KOLOM KANAN: CUSTOMER & PAYMENT */}
        <div className="space-y-6">
          <CustomerInfo customer={orderData.customer} />
          
          <Card className="border-none shadow-sm dark:bg-slate-900">
            <CardHeader className="border-b dark:border-slate-800">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard size={18} className="text-emerald-500" /> 
                Informasi Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Metode</span>
                <span className="font-semibold">{orderData.payment.method}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Status</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                  {orderData.payment.status}
                </Badge>
              </div>
              <div className="pt-4 border-t dark:border-slate-800 flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-white">Total Bayar</span>
                <span className="font-bold text-blue-600 text-lg">
                  Rp {orderData.payment.total.toLocaleString("id-ID")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}