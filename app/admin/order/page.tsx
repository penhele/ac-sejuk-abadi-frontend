"use client";

import { useState } from "react";
import Link from "next/link";
// 🔥 IMPORT SHADCN & LUCIDE
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ExternalLink, 
  Printer, 
  Calendar as CalendarIcon,
  Filter,
  Search
} from "lucide-react";

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("Semua");

  const [orders] = useState([
    {
      id: "ORD-001",
      date: "17 Mar 2026",
      customer: "Fulan Hidayat",
      detail: "AC Panasonic 1 PK x1",
      product: "AC",
      status: "Diproses",
    },
    {
      id: "ORD-002",
      date: "16 Mar 2026",
      customer: "Budi Santoso",
      detail: "Kulkas LG 2 Pintu x1",
      product: "Elektronik",
      status: "Selesai",
    },
    {
      id: "ORD-003",
      date: "15 Mar 2026",
      customer: "Siti Aminah",
      detail: "AC Daikin 1.5 PK x2",
      product: "AC",
      status: "Pending",
    },
    {
      id: "ORD-003",
      date: "15 Mar 2026",
      customer: "Agung",
      detail: "AC Panasonic 1.5 PK x2",
      product: "AC",
      status: "Selesai",
    },
  ]);

  const statuses = ["Semua", "Pending", "Diproses", "Selesai"];

  const filteredOrders =
    statusFilter === "Semua"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  // Helper Warna Status Shadcn
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Selesai": return "outline"; 
      case "Diproses": return "secondary";
      case "Pending": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Pesanan Masuk</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola data pemesanan dan pantau status transaksi pelanggan.
          </p>
        </div>
        
        {/* Total Badge - Dark Mode Friendly */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors w-fit">
          <div className="px-3 py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 border-r border-gray-100 dark:border-slate-800 uppercase tracking-widest">
            Total
          </div>
          <div className="px-3 py-1 text-sm font-bold text-slate-900 dark:text-slate-100">
            {orders.length} Pesanan
          </div>
        </div>
      </div>

      {/* --- FILTER SECTION --- */}
      <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
              <Filter className="w-4 h-4" />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full px-4 h-8 text-xs transition-all ${
                    statusFilter === status 
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- TABLE SECTION --- */}
      <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
              <TableRow className="border-b dark:border-slate-800">
                <TableHead className="w-32 font-bold uppercase text-[11px] tracking-wider">ID Pesanan</TableHead>
                <TableHead className="font-bold uppercase text-[11px] tracking-wider">Tanggal</TableHead>
                <TableHead className="font-bold uppercase text-[11px] tracking-wider">Pelanggan</TableHead>
                <TableHead className="font-bold uppercase text-[11px] tracking-wider">Produk</TableHead>
                <TableHead className="font-bold uppercase text-[11px] tracking-wider">Status</TableHead>
                <TableHead className="text-right font-bold uppercase text-[11px] tracking-wider pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    Tidak ada data pesanan yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order, i) => (
                  <TableRow key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b dark:border-slate-800">
                    <TableCell className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {order.date}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-[10px] text-blue-700 dark:text-blue-300 font-bold">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="truncate max-w-30">{order.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold leading-none">{order.detail}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-medium">{order.product}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={getStatusVariant(order.status) as any} 
                        className={`
                          ${order.status === "Selesai" ? "bg-green-500 hover:bg-green-600 text-white border-none" : ""}
                          ${order.status === "Diproses" ? "bg-amber-500 hover:bg-amber-600 text-white border-none" : ""}
                          font-semibold text-[10px] px-2.5 py-0.5 rounded-full
                        `}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end items-center gap-2">
                        {/* Tombol Cetak Invoice (Hanya jika tidak Pending) */}
                        {order.status !== "Pending" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 gap-2 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            onClick={() => window.print()}
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span className="hidden lg:inline font-bold">Invoice</span>
                          </Button>
                        )}
                        
                        {/* Tombol Detail Link ke order_details */}
                        <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-semibold shadow-sm dark:bg-slate-800">
                          <Link href="/admin/order_details">
                            <ExternalLink className="w-3.5 h-3.5" /> 
                            <span className="hidden sm:inline">Detail</span>
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}