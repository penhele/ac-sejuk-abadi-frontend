"use client";

import { useState } from "react";
import { 
  Search, Package, Truck, CheckCircle2, 
  Clock, XCircle, ChevronRight, ShoppingBag,
  Filter, MoreVertical, ExternalLink, RefreshCcw,
  User, Heart, ShoppingCart, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const ORDERS = [
  {
    id: "ORD-9928341",
    date: "24 Maret 2026",
    status: "Dikirim",
    total: 4550000,
    items: [
      { name: "AC Panasonic 1 PK Inverter", qty: 1, price: 4500000, img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=100&q=80" },
      { name: "Filter Udara Sparepart", qty: 1, price: 50000, img: "https://images.unsplash.com/photo-1585909665970-21c5bc1558ef?w=100&q=80" }
    ]
  },
  {
    id: "ORD-9920012",
    date: "20 Maret 2026",
    status: "Selesai",
    total: 5200000,
    items: [
      { name: "AC Daikin 1.5 PK Standard", qty: 1, price: 5200000, img: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=100&q=80" }
    ]
  }
];

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filter logic sederhana
  const filteredOrders = ORDERS.filter(order => {
    const matchesTab = activeTab === "semua" || order.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAction = (type: string) => {
    toast.info(`Membuka: ${type}`);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl antialiased min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* --- SIDEBAR (Sticky) --- */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="hidden lg:block space-y-1">
            <h2 className="px-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Akun Saya</h2>
            <nav className="space-y-1">
              <SidebarItem icon={<User size={18} />} label="Profil Pribadi" />
              <SidebarItem icon={<Heart size={18} />} label="Wishlist" />
            </nav>
          </div>
          
          {/* Card Info Ringkas (Desktop Only) */}
          <Card className="hidden lg:block border-none bg-blue-600 text-white overflow-hidden shadow-xl shadow-blue-500/20 rounded-2xl">
             <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Truck size={20} />
                   </div>
                   <p className="text-xs font-bold leading-tight uppercase tracking-wider">Layanan Express Aktif</p>
                </div>
                <p className="text-[11px] text-blue-100 opacity-80">Pesanan Anda saat ini sedang diprioritaskan oleh tim logistik kami.</p>
             </CardContent>
          </Card>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 space-y-8">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Riwayat Pesanan</h1>
              <p className="text-muted-foreground text-sm">Pantau status pengiriman dan manajemen belanja Anda.</p>
            </div>
            
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Cari ID Pesanan..." 
                className="pl-10 h-11 rounded-xl bg-white border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs Filter */}
          <Tabs defaultValue="semua" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-slate-100/50 p-1 h-auto flex flex-wrap justify-start rounded-xl overflow-x-auto no-scrollbar border border-slate-200/50">
              {["Semua", "Menunggu Pembayaran", "Diproses", "Dikirim", "Selesai", "Dibatalkan"].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab.toLowerCase()}
                  className="rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* List Pesanan */}
            <div className="mt-8 space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} onAction={handleAction} />
                  ))
                ) : (
                  <EmptyState />
                )}
              </AnimatePresence>
            </div>
          </Tabs>

        </main>
      </div>
    </div>
  );
}

/* --- COMPONENTS --- */

function OrderCard({ order, onAction }: { order: any, onAction: (t: string) => void }) {
  const statusColors: any = {
    "Dikirim": "bg-blue-50 text-blue-600 border-blue-100",
    "Selesai": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Diproses": "bg-amber-50 text-amber-600 border-amber-100",
    "Menunggu Pembayaran": "bg-slate-50 text-slate-600 border-slate-100",
    "Dibatalkan": "bg-red-50 text-red-600 border-red-100",
  };

  const StatusIcon: any = {
    "Dikirim": <Truck size={14} />,
    "Selesai": <CheckCircle2 size={14} />,
    "Menunggu Pembayaran": <Clock size={14} />,
    "Dibatalkan": <XCircle size={14} />,
    "Diproses": <Loader2 size={14} className="animate-spin" />,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 rounded-2xl overflow-hidden">
        {/* Header Card */}
        <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 leading-none">Tanggal Pesanan</p>
              <p className="text-sm font-bold text-slate-700">{order.date}</p>
            </div>
            <Separator orientation="vertical" className="h-8 bg-slate-200 hidden sm:block" />
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 leading-none">Order ID</p>
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
            {/* Daftar Produk */}
            <div className="flex-1 space-y-5">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="h-16 w-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{item.qty} Barang x Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              ))}
              {order.items.length > 2 && (
                <button className="text-xs font-bold text-blue-600 hover:underline">+ {order.items.length - 2} Produk Lainnya</button>
              )}
            </div>

            {/* Ringkasan & Aksi */}
            <div className="lg:w-72 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8 space-y-6">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Total Belanja</p>
                <p className="text-xl font-black text-slate-900 leading-none">Rp {order.total.toLocaleString('id-ID')}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="rounded-xl font-bold text-xs h-10 border-slate-200" onClick={() => onAction('Detail')}>
                  Lihat Detail
                </Button>
                <Button className="rounded-xl font-bold text-xs h-10 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20" onClick={() => onAction('Lacak')}>
                  Lacak Paket
                </Button>
                <Button variant="ghost" className="col-span-2 rounded-xl font-bold text-xs h-10 text-slate-500 hover:bg-blue-50 hover:text-blue-600 gap-2" onClick={() => onAction('Beli Lagi')}>
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

function SidebarItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-between h-12 rounded-xl px-4 transition-all group",
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 hover:text-white" 
          : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
      )}
    >
      <div className="flex items-center gap-3 font-bold text-sm tracking-tight">
        {icon}
        {label}
      </div>
      <ChevronRight size={14} className={cn("opacity-0 group-hover:opacity-100 transition-opacity", active && "opacity-100")} />
    </Button>
  );
}

function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col items-center justify-center py-24 text-center space-y-6"
    >
      <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200">
        <Package size={40} className="text-slate-300" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-black text-slate-900">Belum ada pesanan</h3>
        <p className="text-sm text-muted-foreground max-w-[280px]">Sepertinya Anda belum melakukan pemesanan di tab ini.</p>
      </div>
      <Button className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 font-bold">
        Mulai Belanja
      </Button>
    </motion.div>
  );
}