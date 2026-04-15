"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Printer, 
  ExternalLink, 
  Calendar, 
  MoreHorizontal, 
  CheckCircle, 
  RefreshCw, 
  XCircle 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Order, OrderStatus } from "@/types/order";
import orderService from "@/src/services/order.service"; 
import { toast } from "sonner";

interface OrderRowProps {
  order: Order;
  onUpdate?: () => void;
}

export function OrderTableRow({ order, onUpdate }: OrderRowProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const statusStyles: Record<OrderStatus, string> = {
    "Selesai": "bg-emerald-500 hover:bg-emerald-600 text-white border-none",
    "Diproses": "bg-amber-500 hover:bg-amber-600 text-white border-none",
    "Pending": "bg-rose-500 hover:bg-rose-600 text-white border-none",
    "Dibatalkan": "bg-slate-400 text-white border-none",
    "Dikirim": "bg-blue-500 hover:bg-blue-600 text-white border-none",
  };

  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    try {
      setIsUpdating(true);
      await orderService.updateOrderStatus(order.id, newStatus);
      toast.success(`Pesanan ${order.id} diperbarui`);
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error("Gagal memperbarui status");
    } finally {
      setIsUpdating(false);
    }
  };

  const firstItemName = order.items && order.items.length > 0 
    ? order.items[0].name 
    : "Tanpa Produk";
    
  const extraItemsCount = order.items && order.items.length > 1 
    ? `+${order.items.length - 1} lainnya` 
    : "";

  return (
    <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
      <TableCell className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
        {order.id}
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
          <Calendar className="w-3.5 h-3.5" />
          {order.date}
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
            {order.customer?.name || "Pelanggan Anonim"}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {order.customer?.email || "-"}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col min-w-37.5">
          <span className="text-sm font-medium truncate">
            {firstItemName} <span className="text-blue-500 text-[10px]">{extraItemsCount}</span>
          </span>
          <span className="text-[10px] uppercase text-slate-400 font-bold">
            {order.items?.[0]?.category || "General"}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <Badge className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shadow-none whitespace-nowrap ${statusStyles[order.status]}`}>
          {isUpdating && <RefreshCw className="w-3 h-3 animate-spin mr-1" />}
          {order.status}
        </Badge>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isUpdating}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <div className="px-2 py-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Ubah Status</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdateStatus("Diproses")} className="gap-2 text-xs cursor-pointer font-medium">
                <RefreshCw className="w-3.5 h-3.5 text-amber-500" /> Tandai Diproses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateStatus("Selesai")} className="gap-2 text-xs cursor-pointer font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Tandai Selesai
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateStatus("Dibatalkan")} className="gap-2 text-xs text-rose-500 cursor-pointer font-medium">
                <XCircle className="w-3.5 h-3.5" /> Batalkan Pesanan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="gap-2 text-xs cursor-pointer font-medium">
                <Link href={`/admin/orders/${order.id}`}>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500" /> Lihat Detail Penuh
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {order.status === "Selesai" && (
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-blue-600 border-blue-100 bg-blue-50/50" onClick={() => window.print()}>
              <Printer className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}