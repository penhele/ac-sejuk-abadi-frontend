"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Search, ListFilter, RefreshCcw } from "lucide-react";
import { Order, OrderStatus } from "@/types/order";
import { OrderStats } from "@/components/admin/orders/order-stat";
import { OrderTableRow } from "@/components/admin/orders/order-table-row";
import orderService from "@/src/services/order.service"; 
import { toast } from "sonner";

export function OrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "Semua">("Semua");
  const [search, setSearch] = useState("");
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders(); 
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengambil data pesanan terbaru");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filter === "Semua" || order.status === filter;
    
    const customerName = order.customer?.name || "";
    const orderId = order.id || "";
    
    const matchesSearch = 
      customerName.toLowerCase().includes(search.toLowerCase()) || 
      orderId.toLowerCase().includes(search.toLowerCase());
      
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            Pesanan Masuk
          </h1>
          <p className="text-muted-foreground text-sm">Monitor dan kelola transaksi pelanggan secara real-time.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchOrders} 
          disabled={loading}
          className="rounded-xl gap-2 h-10 border-slate-200 dark:border-slate-800"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* STATS SECTION */}
      <OrderStats orders={orders} />

      {/* FILTER & SEARCH BOX */}
      <Card className="p-2 border-none shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Cari ID atau Nama Pelanggan..." 
            className="pl-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar pr-2">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 mr-1">
            <ListFilter className="w-4 h-4 text-slate-500" />
          </div>
          {["Semua", "Pending", "Diproses", "Selesai", "Dibatalkan"].map((s) => (
            <Button
              key={s}
              variant={filter === s ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(s as any)}
              className={`rounded-lg h-9 px-4 text-xs font-bold transition-all ${
                filter === s 
                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              }`}
            >
              {s}
            </Button>
          ))}
        </div>
      </Card>

      {/* TABLE SECTION */}
      <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-35 uppercase text-[10px] font-black tracking-widest py-5 pl-6 text-slate-500">ID Pesanan</TableHead>
                <TableHead className="uppercase text-[10px] font-black tracking-widest text-slate-500">Waktu Masuk</TableHead>
                <TableHead className="uppercase text-[10px] font-black tracking-widest text-slate-500">Info Pelanggan</TableHead>
                <TableHead className="uppercase text-[10px] font-black tracking-widest text-slate-500">Item Pesanan</TableHead>
                <TableHead className="uppercase text-[10px] font-black tracking-widest text-slate-500">Status</TableHead>
                <TableHead className="text-right uppercase text-[10px] font-black tracking-widest pr-6 text-slate-500">Kontrol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 animate-spin" />
                      </div>
                      <p className="text-sm font-medium text-slate-400 animate-pulse tracking-wide">Menyinkronkan Data...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderTableRow 
                    key={order.id} 
                    order={order} 
                    onUpdate={fetchOrders} 
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                       <p className="text-slate-400 text-sm font-medium">Tidak ada data pesanan ditemukan.</p>
                       <Button variant="link" onClick={() => {setSearch(""); setFilter("Semua")}} className="text-blue-500 text-xs">Reset Semua Filter</Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}