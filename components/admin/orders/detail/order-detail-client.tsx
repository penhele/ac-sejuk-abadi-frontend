"use client";

import React, { useEffect, useState, useCallback } from "react";
import { OrderHeader } from "@/components/admin/orders/detail/order-header";
import { OrderItems } from "@/components/admin/orders/detail/order-items";
import { CustomerInfo } from "@/components/admin/orders/detail/customer-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, CreditCard, RefreshCw, AlertCircle, History } from "lucide-react";
import orderService from "@/src/services/order.service";
import { Order } from "@/types/order";
import { toast } from "sonner";

export function OrderDetailClient({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetail = useCallback(async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrderById(orderId);
      setOrder(data);
    } catch (error) {
      toast.error("Gagal memuat data dari server");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-slate-50/50 dark:bg-zinc-950">
      <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
      <p className="text-sm font-medium text-muted-foreground">Menyiapkan data pesanan...</p>
    </div>
  );

  if (!order) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <AlertCircle className="w-12 h-12 text-rose-500" />
      <h2 className="text-xl font-bold">Pesanan Tidak Ditemukan</h2>
      <button onClick={() => window.history.back()} className="text-blue-600 underline">Kembali ke Daftar Pesanan</button>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. HEADER SECTION */}
      <OrderHeader 
        orderId={order.id} 
        status={order.status} 
        date={order.date} 
        onUpdate={fetchOrderDetail} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI (70% Lebar Desktop) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Rincian Produk */}
          <OrderItems items={order.items} total={order.amount} />
          
          {/* Timeline Pelacakan yang disempurnakan */}
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-800/50 py-4">
              <CardTitle className="text-base flex items-center gap-2">
                <History size={18} className="text-blue-500" /> 
                Riwayat Status Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 relative">
              <div className="absolute left-9.75 top-10 bottom-10 w-0.5 bg-slate-100 dark:bg-slate-800" />
              
              <div className="space-y-10">
                {/* Status Aktif */}
                <div className="relative pl-12">
                  <div className="absolute -left-1.25 top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-blue-100 dark:border-blue-900 z-10 shadow-md animate-pulse" />
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      {order.status}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Status diperbarui secara otomatis oleh sistem Admin.</p>
                    <p className="text-[10px] font-bold text-blue-500 mt-2">{order.date}</p>
                  </div>
                </div>

                {/* Status Lampau */}
                <div className="relative pl-12 opacity-40">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 z-10" />
                  <div>
                    <p className="text-sm font-bold">Pesanan Dibuat</p>
                    <p className="text-xs italic">Pelanggan telah melakukan checkout produk.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KOLOM KANAN  */}
        <div className="space-y-8">
          
          {/* Informasi Pelanggan */}
          <CustomerInfo customer={order.customer} />
          
          {/* Ringkasan Pembayaran */}
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="border-b bg-emerald-50/30 dark:bg-emerald-900/10 py-4">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard size={18} className="text-emerald-500" /> 
                Status Keuangan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Metode Pembayaran</span>
                <Badge variant="secondary" className="font-bold">{order.payment?.method || "Transfer"}</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Status Verifikasi</span>
                <Badge className="bg-emerald-500 text-white border-none text-[10px] font-bold">Lunas / Terverifikasi</Badge>
              </div>
              
              <div className="pt-5 border-t dark:border-slate-800">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Invoice</span>
                  <span className="font-black text-blue-600 dark:text-blue-400 text-2xl tracking-tighter">
                    Rp {order.amount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips Admin (Optional) */}
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
            <p className="text-[11px] text-blue-600 dark:text-blue-400 leading-relaxed font-medium">
              <strong>Catatan:</strong> Pastikan stok barang tersedia sebelum menandai status sebagai <b>"Diproses"</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}