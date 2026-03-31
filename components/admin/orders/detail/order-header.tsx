"use client";

import { ChevronLeft, Printer, CheckCircle2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderHeaderProps {
  orderId: string;
  status: string;
  date: string;
}

export function OrderHeader({ orderId, status, date }: OrderHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full">
          <ChevronLeft size={20} />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{orderId}</h1>
            <Badge className="bg-blue-500 hover:bg-blue-600 uppercase text-[10px]">{status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}