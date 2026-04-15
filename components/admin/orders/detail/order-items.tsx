"use client";

import { Package, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderItem } from "@/types/order";

const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export function OrderItems({ items, total }: { items: OrderItem[], total: number }) {
  return (
    <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
      <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-800/50 py-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-base font-bold tracking-tight">Rincian Produk</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/30 dark:bg-slate-800/20">
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 uppercase text-[10px] font-bold tracking-widest py-3">Informasi Produk</TableHead>
                <TableHead className="text-center uppercase text-[10px] font-bold tracking-widest">Harga Satuan</TableHead>
                <TableHead className="text-center uppercase text-[10px] font-bold tracking-widest">Jumlah</TableHead>
                <TableHead className="text-right pr-6 uppercase text-[10px] font-bold tracking-widest">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform">
                        <Package className="text-slate-400" size={20} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Tag size={12} className="text-blue-500" />
                          <span className="font-medium">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center text-sm font-medium text-slate-600 dark:text-slate-400">
                    {formatIDR(item.price)}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold border">
                      {item.quantity}x
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-right pr-6 font-bold text-slate-900 dark:text-white">
                    {formatIDR(item.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
              
              <TableRow className="bg-blue-50/30 dark:bg-blue-900/10 hover:bg-blue-50/30">
                <TableCell colSpan={3} className="text-right py-6">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Bayar</span>
                </TableCell>
                <TableCell className="text-right pr-6 py-6">
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                    {formatIDR(total)}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}