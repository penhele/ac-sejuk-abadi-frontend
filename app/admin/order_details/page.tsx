"use client";

import { useState } from "react";
import { 
  ChevronLeft, 
  Printer, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  Phone, 
  Mail,
  MoreVertical,
  Download,
  AlertCircle,
  User
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OrderDetailPage() {
  const [orderStatus, setOrderStatus] = useState("Diproses");

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* 1. HEADER & ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">ORD-2026-9901</h1>
              <Badge className="bg-blue-500 hover:bg-blue-600 uppercase text-[10px]">
                {orderStatus}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Dipesan pada 17 Maret 2026, 14:20 WIB</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Printer size={16} /> Cetak Invoice
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
            <CheckCircle2 size={16} /> Selesaikan Pesanan
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-600">Batalkan Pesanan</DropdownMenuItem>
              <DropdownMenuItem>Hubungi Pelanggan</DropdownMenuItem>
              <DropdownMenuItem>Salin Data Pengiriman</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN - MAIN INFO */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 2. ORDER ITEMS */}
          <Card className="border-none shadow-sm overflow-hidden dark:bg-slate-900">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg">Daftar Produk</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Produk</TableHead>
                    <TableHead className="text-center">Jumlah</TableHead>
                    <TableHead className="text-right pr-6">Harga</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center border">
                          <Package className="text-slate-400" size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-sm">AC Panasonic 1 PK - CS-YN9WKJ</p>
                          <p className="text-[11px] text-muted-foreground">Kategori: Air Conditioner</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-right pr-6 font-medium">Rp 4.250.000</TableCell>
                  </TableRow>
                  {/* Summary Rows */}
                  <TableRow className="bg-muted/10">
                    <TableCell colSpan={2} className="text-right font-medium">Subtotal</TableCell>
                    <TableCell className="text-right pr-6 font-bold">Rp 4.250.000</TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/10">
                    <TableCell colSpan={2} className="text-right text-muted-foreground">Biaya Pemasangan</TableCell>
                    <TableCell className="text-right pr-6 text-green-600">Rp 0 (Promo)</TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/20">
                    <TableCell colSpan={2} className="text-right font-bold text-blue-600">Total Pembayaran</TableCell>
                    <TableCell className="text-right pr-6 font-bold text-blue-600 text-lg">Rp 4.250.000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 3. ORDER TIMELINE / TRACKING */}
          <Card className="border-none shadow-sm dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck size={18} className="text-blue-500" /> Pelacakan Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pl-8 space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 z-10" />
                <p className="text-sm font-bold">Pesanan Sedang Diproses</p>
                <p className="text-xs text-muted-foreground">17 Mar 2026 - 15:00 WIB • Teknisi sedang menyiapkan unit AC.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-slate-300 border-4 border-white dark:border-slate-950 z-10" />
                <p className="text-sm font-medium text-slate-500">Menunggu Penjemputan Kurir</p>
                <p className="text-xs text-muted-foreground">Sistem menjadwalkan pengiriman unit.</p>
              </div>
              <div className="relative opacity-50">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-slate-300 border-4 border-white dark:border-slate-950 z-10" />
                <p className="text-sm font-medium">Pesanan Selesai</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - SIDEBAR INFO */}
        <div className="space-y-6">
          
          {/* 4. CUSTOMER INFO */}
          <Card className="border-none shadow-sm dark:bg-slate-900 overflow-hidden">
            <div className="h-2 bg-blue-600 w-full" />
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User size={18} className="text-blue-500" /> Informasi Pelanggan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">Agung Saputra</p>
                  <p className="text-xs text-muted-foreground mt-1">ID Pelanggan: CUST-442</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <p className="text-sm">agung@example.com</p>
                </div>
                <div className="flex gap-3">
                  <Phone size={16} className="text-slate-400 shrink-0" />
                  <p className="text-sm">+62 812-3456-7890</p>
                </div>
                <div className="flex gap-3">
                  <MapPin size={16} className="text-slate-400 shrink-0" />
                  <div className="text-sm leading-relaxed">
                    <strong>Alamat Pengiriman:</strong><br />
                    Jl. Margonda Raya No. 100, Depok<br />
                    Jawa Barat, 16424
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. PAYMENT INFO */}
          <Card className="border-none shadow-sm dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard size={18} className="text-green-500" /> Detail Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Metode</span>
                <span className="font-medium">Transfer Bank (BCA)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20">
                  Lunas
                </Badge>
              </div>
              <Separator />
              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900 flex gap-3">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 dark:text-amber-400 leading-normal">
                  Pelanggan melampirkan pesan tambahan: "Mohon kirimkan teknisi yang sudah berpengalaman."
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}