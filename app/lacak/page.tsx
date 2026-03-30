"use client";

import { useState } from "react";
import { 
  Search, Package, Truck, CheckCircle2, 
  Clock, XCircle, ChevronRight, ShoppingBag,
  RefreshCcw, User, Heart, Loader2, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [modalType, setModalType] = useState<"tracking" | "detail" | null>(null);

  const filteredOrders = ORDERS.filter(order => {
    const matchesTab = activeTab === "semua" || order.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const openModal = (type: "tracking" | "detail", order: any) => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setTimeout(() => setSelectedOrder(null), 300); // Clean up after animation
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl antialiased min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="hidden lg:block space-y-1">
            <h2 className="px-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Akun Saya</h2>
            <nav className="space-y-1">
              <SidebarItem icon={<User size={18} />} label="Profil Pribadi" />
              <SidebarItem icon={<Heart size={18} />} label="Wishlist" />
              <SidebarItem icon={<Package size={18} />} label="Pesanan" active />
            </nav>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Riwayat Pesanan</h1>
              <p className="text-muted-foreground text-sm">Pantau status pengiriman belanja Anda.</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Cari ID Pesanan..." 
                className="pl-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="semua" onValueChange={setActiveTab}>
            <TabsList className="bg-slate-100/50 p-1 h-auto flex flex-wrap justify-start rounded-xl">
              {["Semua", "Diproses", "Dikirim", "Selesai"].map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase()} className="rounded-lg px-6 py-2 text-xs font-bold uppercase">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-8 space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onAction={openModal} />
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </main>
      </div>

      {/* --- MODALS --- */}
      <TrackingModal 
        isOpen={modalType === "tracking"} 
        onClose={closeModal} 
        order={selectedOrder} 
      />
      <OrderDetailSheet 
        isOpen={modalType === "detail"} 
        onClose={closeModal} 
        order={selectedOrder} 
      />
    </div>
  );
}

// --- SUB-COMPONENTS ---

function OrderCard({ order, onAction }: { order: any, onAction: (t: any, o: any) => void }) {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card className="group border-slate-200/60 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden">
        <div className="bg-slate-50/50 px-6 py-4 border-b flex justify-between items-center">
          <div className="flex gap-4 text-sm font-bold">
            <span className="text-slate-400 uppercase text-[10px] block">ID: {order.id}</span>
            <span className="text-slate-700">{order.date}</span>
          </div>
          <Badge className="rounded-full uppercase text-[10px] px-3">{order.status}</Badge>
        </div>
        <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 space-y-4">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex gap-4">
                <img src={item.img} className="h-12 w-12 rounded-lg object-cover" alt="" />
                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.qty} x Rp {item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-48 flex flex-col gap-2">
             <Button variant="outline" className="rounded-xl text-xs font-bold" onClick={() => onAction("detail", order)}>Detail Pesanan</Button>
             <Button className="rounded-xl text-xs font-bold bg-blue-600" onClick={() => onAction("tracking", order)}>Lacak Paket</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TrackingModal({ isOpen, onClose, order }: any) {
  const steps = [
    { title: "Pesanan Dibuat", desc: "Pesanan Anda telah diterima", time: "10:00", active: true },
    { title: "Dikemas", desc: "Penjual sedang menyiapkan barang", time: "14:00", active: true },
    { title: "Dalam Pengiriman", desc: "Kurir sedang menuju lokasi Anda", time: "16:30", active: order?.status === "Dikirim" },
    { title: "Selesai", desc: "Paket telah diterima", time: "-", active: order?.status === "Selesai" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">Status Pengiriman</h3>
              <Button variant="ghost" size="icon" onClick={onClose}><X size={20}/></Button>
            </div>
            <div className="space-y-6 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100" />
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className={cn("h-8 w-8 rounded-full border-4 border-white z-10 flex items-center justify-center", step.active ? "bg-blue-600 text-white" : "bg-slate-200")}>
                    {step.active && <CheckCircle2 size={14}/>}
                  </div>
                  <div>
                    <p className={cn("text-sm font-bold", step.active ? "text-slate-900" : "text-slate-400")}>{step.title}</p>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-8 rounded-xl bg-slate-900" onClick={onClose}>Tutup</Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function OrderDetailSheet({ isOpen, onClose, order }: any) {
  if (!order) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/20" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white p-6 shadow-2xl flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={onClose}><ChevronRight className="rotate-180"/></Button>
              <h3 className="text-lg font-black">Detail Pembayaran</h3>
            </div>
            <div className="flex-1 space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Alamat Tujuan</p>
                <p className="text-sm font-bold">Rumah Utama</p>
                <p className="text-xs text-slate-600">Jl. Teknologi No. 404, Jakarta Pusat</p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-slate-400">Ringkasan</p>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold">Rp {order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-blue-600">
                  <span>Promo Diskon</span>
                  <span className="font-bold">-Rp 0</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-black">
                  <span>Total</span>
                  <span className="text-blue-600">Rp {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <Button className="w-full rounded-xl bg-blue-600 h-12 font-bold" onClick={() => toast.success("Invoice diunduh")}>Unduh Invoice</Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarItem({ icon, label, active = false }: any) {
  return (
    <Button variant="ghost" className={cn("w-full justify-start gap-3 h-11 rounded-xl font-bold text-sm", active ? "bg-blue-50 text-blue-600" : "text-slate-500")}>
      {icon} {label}
    </Button>
  );
}