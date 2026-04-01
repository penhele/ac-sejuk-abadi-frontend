// src/app/orders/_components/order-card.tsx
import { motion } from "framer-motion";
import { Truck, CheckCircle2, XCircle, Loader2, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function OrderCard({ order, onAction }: { order: any, onAction: (t: string) => void }) {
  const statusColors: any = {
    "Dikirim": "bg-blue-50 text-blue-600 border-blue-100",
    "Selesai": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Diproses": "bg-amber-50 text-amber-600 border-amber-100",
    "Dibatalkan": "bg-red-50 text-red-600 border-red-100",
  };

  const StatusIcon: any = {
    "Dikirim": <Truck size={14} />,
    "Selesai": <CheckCircle2 size={14} />,
    "Dibatalkan": <XCircle size={14} />,
    "Diproses": <Loader2 size={14} className="animate-spin" />,
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
      <Card className="group border-slate-200/60 shadow-sm hover:shadow-xl transition-all rounded-2xl overflow-hidden">
        <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Tanggal Pesanan</p>
              <p className="text-sm font-bold text-slate-700">{order.date}</p>
            </div>
            <Separator orientation="vertical" className="h-8 bg-slate-200" />
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Order ID</p>
              <p className="text-sm font-bold text-blue-600">#{order.id}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("px-4 py-1.5 rounded-full border text-[11px] font-black uppercase flex items-center gap-2", statusColors[order.status])}>
            {StatusIcon[order.status]}
            {order.status}
          </Badge>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex-1 space-y-5">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="h-16 w-16 rounded-xl bg-slate-100 border overflow-hidden shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{item.qty} Barang x Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-72 flex flex-col justify-between border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-8 space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Belanja</p>
                <p className="text-xl font-black text-slate-900">Rp {order.total.toLocaleString('id-ID')}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="rounded-xl font-bold text-xs" onClick={() => onAction('Detail')}>Detail</Button>
                <Button className="rounded-xl font-bold text-xs bg-blue-600" onClick={() => onAction('Lacak')}>Lacak Paket</Button>
                <Button variant="ghost" className="col-span-2 rounded-xl font-bold text-xs text-slate-500 hover:text-blue-600 gap-2" onClick={() => onAction('Beli Lagi')}>
                  <RefreshCcw size={14} /> Beli Lagi
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}