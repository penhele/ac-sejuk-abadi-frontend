"use client";

import { useState } from "react";
// 🔥 IMPORT SHADCN & LUCIDE
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ShoppingBag, 
  ExternalLink, 
  RefreshCcw, 
  Calendar as CalendarIcon,
  User,
  Filter
} from "lucide-react";

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("Semua");

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      date: "2026-03-17",
      customer: "Agung",
      detail: "AC Panasonic 1 PK x1",
      product: "AC",
      status: "Diproses",
    },
    {
      id: "ORD-002",
      date: "2026-03-16",
      customer: "Budi",
      detail: "Kulkas LG 2 Pintu x1",
      product: "Lainnya",
      status: "Selesai",
    },
    {
      id: "ORD-003",
      date: "2026-03-15",
      customer: "Siti",
      detail: "AC Daikin 1.5 PK x2",
      product: "AC",
      status: "Pending",
    },
  ]);

  const statuses = ["Semua", "Pending", "Diproses", "Selesai"];

  const filteredOrders =
    statusFilter === "Semua"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  // Fungsi helper untuk warna status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Selesai": return "default"; // Hitam/Biru Tua
      case "Diproses": return "secondary"; // Abu-abu/Biru Muda
      case "Pending": return "destructive"; // Merah
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pesanan Masuk</h1>
          <p className="text-muted-foreground text-sm">Pantau dan update status pemesanan pelanggan secara real-time.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
          <div className="px-3 py-1 text-xs font-bold text-blue-600 border-r uppercase tracking-wider">Total</div>
          <div className="px-3 py-1 text-sm font-bold">{orders.length} Pesanan</div>
        </div>
      </div>

      {/* FILTER CARD */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-1">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="rounded-full px-4 h-8 text-xs"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TABLE CARD */}
      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-30">ID Pesanan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Detail Produk</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Belum ada pesanan dengan status ini.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order, i) => (
                <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-mono text-xs text-blue-600 font-bold">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="w-3 h-3" />
                      {order.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-700 font-bold">
                        {order.customer.charAt(0)}
                      </div>
                      {order.customer}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{order.detail}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{order.product}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusVariant(order.status) as any} 
                      className={`
                        ${order.status === "Selesai" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                        ${order.status === "Diproses" ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}
                        font-normal
                      `}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                        <ExternalLink className="w-3 h-3" /> Detail
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                        <RefreshCcw className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}