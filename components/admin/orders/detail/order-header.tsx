"use client";

import { useState } from "react";
import { ChevronLeft, Printer, CheckCircle2, MoreVertical, Phone, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import orderService from "@/src/services/order.service";
import { toast } from "sonner";

interface OrderHeaderProps {
  orderId: string;
  status: string;
  date: string;
  onUpdate?: () => void; 
}

export function OrderHeader({ orderId, status, date, onUpdate }: OrderHeaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const statusColors: Record<string, string> = {
    Selesai: "bg-emerald-500 hover:bg-emerald-600",
    Diproses: "bg-amber-500 hover:bg-amber-600",
    Pending: "bg-rose-500 hover:bg-rose-600",
    Dibatalkan: "bg-slate-500 hover:bg-slate-600",
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      setLoading(true);
      await orderService.updateOrderStatus(orderId, newStatus);
      toast.success(`Status pesanan berhasil diubah ke ${newStatus}`);
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error("Gagal memperbarui status pesanan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => router.back()} 
          className="rounded-full h-10 w-10 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ChevronLeft size={22} />
        </Button>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {orderId}
            </h1>
            <Badge className={`${statusColors[status] || "bg-blue-500"} border-none text-[10px] font-bold px-3 py-0.5 rounded-full`}>
              {status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            Terdaftar pada {date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Tombol Cetak */}
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 h-9 rounded-xl font-bold text-xs border-slate-200"
          onClick={() => window.print()}
        >
          <Printer size={15} /> Cetak Invoice
        </Button>

        {/* Tombol Cepat: */}
        {status !== "Selesai" && status !== "Dibatalkan" && (
          <Button 
            size="sm" 
            disabled={loading}
            onClick={() => handleStatusChange("Selesai")}
            className="bg-blue-600 hover:bg-blue-700 gap-2 h-9 rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20"
          >
            {loading ? <RefreshCw size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
            Selesaikan Pesanan
          </Button>
        )}

        {/* Menu Lainnya */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
            <DropdownMenuItem 
              onClick={() => handleStatusChange("Diproses")}
              className="gap-2 text-xs cursor-pointer py-2"
            >
              <RefreshCw size={14} className="text-amber-500" /> Tandai Sedang Diproses
            </DropdownMenuItem>
            
            <DropdownMenuItem className="gap-2 text-xs cursor-pointer py-2">
              <Phone size={14} className="text-blue-500" /> Hubungi Pelanggan
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={() => handleStatusChange("Dibatalkan")}
              className="gap-2 text-xs text-rose-600 cursor-pointer py-2 font-medium"
            >
              <XCircle size={14} /> Batalkan Pesanan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}