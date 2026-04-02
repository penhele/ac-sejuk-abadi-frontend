"use client";

import { useState } from "react";
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
import { Search, ListFilter } from "lucide-react";
import { Order, OrderStatus } from "@/types/order";
import { OrderStats } from "@/components/admin/orders/order-stat";
import { OrderTableRow } from "@/components/admin/orders/order-table-row";

const DUMMY_ORDERS: Order[] = [
  { id: "ORD-001", date: "17 Mar 2026", customer: "Fulan Hidayat", email: "fulan@gmail.com", detail: "AC Panasonic 1 PK x1", productType: "AC", status: "Diproses", amount: 4500000 },
  { id: "ORD-002", date: "16 Mar 2026", customer: "Budi Santoso", email: "budi@gmail.com", detail: "Kulkas LG 2 Pintu x1", productType: "Elektronik", status: "Selesai", amount: 3200000 },
  { id: "ORD-003", date: "15 Mar 2026", customer: "Siti Aminah", email: "siti@gmail.com", detail: "AC Daikin 1.5 PK x2", productType: "AC", status: "Pending", amount: 9800000 },
];

export function OrdersClient() {
  const [filter, setFilter] = useState<OrderStatus | "Semua">("Semua");
  const [search, setSearch] = useState("");

  const filteredOrders = DUMMY_ORDERS.filter((order) => {
    const matchesStatus = filter === "Semua" || order.status === filter;
    const matchesSearch = order.customer.toLowerCase().includes(search.toLowerCase()) || 
                          order.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Pesanan Masuk</h1>
          <p className="text-muted-foreground text-sm">Monitor dan kelola transaksi pelanggan secara real-time.</p>
        </div>
      </div>

      {/* STATS */}
      <OrderStats orders={DUMMY_ORDERS} />

      {/* FILTER & SEARCH */}
      <Card className="p-4 border-none shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Cari ID atau Nama Pelanggan..." 
            className="pl-10 h-10 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <ListFilter className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          {["Semua", "Pending", "Diproses", "Selesai"].map((s) => (
            <Button
              key={s}
              variant={filter === s ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(s as any)}
              className={`rounded-full h-8 px-4 text-xs shrink-0 ${
                filter === s 
                ? "bg-blue-600 shadow-lg shadow-blue-500/20 text-white hover:bg-blue-700" 
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {s}
            </Button>
          ))}
        </div>
      </Card>

      {/* TABLE */}
      <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="uppercase text-[10px] font-bold tracking-widest">ID</TableHead>
                <TableHead className="uppercase text-[10px] font-bold tracking-widest">Waktu</TableHead>
                <TableHead className="uppercase text-[10px] font-bold tracking-widest">Pelanggan</TableHead>
                <TableHead className="uppercase text-[10px] font-bold tracking-widest">Item</TableHead>
                <TableHead className="uppercase text-[10px] font-bold tracking-widest">Status</TableHead>
                <TableHead className="text-right uppercase text-[10px] font-bold tracking-widest pr-6">Opsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderTableRow key={order.id} order={order} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-muted-foreground">
                    Data tidak ditemukan...
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