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

  const handleAction = (type: string, order: any) => {
    if (type === 'Lacak') {
      setSelectedOrder(order);
      setModalType("tracking");
    } else if (type === 'Detail') {
      setSelectedOrder(order);
      setModalType("detail");
    } else if (type === 'Beli Lagi') {
      toast.success("Produk berhasil ditambahkan ke keranjang");
    }
  };

  const closeModal = () => {
    setModalType(null);
    // Delay sedikit agar animasi exit selesai sebelum data dihapus
    setTimeout(() => setSelectedOrder(null), 300);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl antialiased min-h-screen">
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Riwayat Pesanan</h1>
              <p className="text-muted-foreground text-sm">Pantau status pengiriman dan manajemen belanja Anda.</p>
            </div>
            
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Cari ID Pesanan..." 
                className="pl-10 h-11 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="semua" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-slate-100/50 p-1 h-auto flex flex-wrap justify-start rounded-xl overflow-x-auto no-scrollbar border border-slate-200/50">
              {["Semua", "Diproses", "Dikirim", "Selesai", "Dibatalkan"].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab.toLowerCase()}
                  className="rounded-lg px-6 py-2.5 text-xs font-bold uppercase"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-8 space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} onAction={(type) => handleAction(type, order)} />
                  ))
                ) : (
                  <EmptyState />
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </main>
      </div>

      {/* --- MODAL RENDERING --- */}
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

/* --- COMPONENTS --- */

function OrderCard({ order, onAction }: { order: any, onAction: (t: string) => void }) {
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

function TrackingModal({ isOpen, onClose, order }: any) {
  if (!order) return null;
  
  const steps = [
    { status: "Pesanan Diterima", time: "24 Mar, 10:00", desc: "Pesanan telah dikonfirmasi.", completed: true },
    { status: "Dikemas", time: "24 Mar, 14:20", desc: "Penjual sedang menyiapkan barang.", completed: true },
    { status: "Dalam Perjalanan", time: "25 Mar, 08:00", desc: "Paket dibawa kurir JNE.", completed: order.status === "Dikirim" || order.status === "Selesai" },
    { status: "Sampai", time: "-", desc: "Paket tiba di tujuan.", completed: order.status === "Selesai" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-900">Lacak Paket</h3>
                <p className="text-xs text-slate-500 font-bold">Resi: <span className="text-blue-600">JP9928341</span></p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}><X size={20}/></Button>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="space-y-8 relative">
                <div className="absolute left-2.75 top-2 bottom-2 w-0.5 bg-slate-100" />
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex gap-6">
                    <div className={cn("z-10 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center", step.completed ? "bg-blue-600 shadow-lg shadow-blue-500/40" : "bg-slate-200")}>
                      {step.completed && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={cn("text-sm font-black uppercase", step.completed ? "text-slate-900" : "text-slate-400")}>{step.status}</h4>
                        <span className="text-[10px] font-bold text-slate-400">{step.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-slate-50">
              <Button className="w-full rounded-xl font-black bg-blue-600" onClick={onClose}>Tutup</Button>
            </div>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onClose}><ChevronRight className="rotate-180" /></Button>
              <h3 className="text-lg font-black text-slate-900">Detail Pesanan</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <section className="space-y-3">
                <div className="text-slate-400 uppercase text-[10px] font-black tracking-widest flex items-center gap-2"><Truck size={14}/> Alamat Pengiriman</div>
                <div className="p-4 rounded-2xl bg-slate-50 border">
                  <p className="text-sm font-bold">Budi Setiawan</p>
                  <p className="text-xs text-slate-600 mt-1">Jl. Raya Merdeka No. 123, Tebet, Jakarta Selatan</p>
                </div>
              </section>
              <section className="space-y-4">
                <div className="text-slate-400 uppercase text-[10px] font-black tracking-widest flex items-center gap-2"><ShoppingBag size={14}/> Rincian Pembayaran</div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">Rp {order.total.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Biaya Kirim</span><span className="font-bold">Rp 25.000</span></div>
                  <Separator />
                  <div className="flex justify-between text-lg font-black text-blue-600"><span>Total</span><span>Rp {(order.total + 25000).toLocaleString()}</span></div>
                </div>
              </section>
            </div>
            <div className="p-6 border-t"><Button className="w-full h-12 rounded-xl bg-blue-600 font-bold">Bantuan</Button></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarItem({ icon, label, active = false }: any) {
  return (
    <Button variant="ghost" className={cn("w-full justify-between h-12 rounded-xl px-4 transition-all group", active ? "bg-blue-600 text-white shadow-blue-500/20" : "text-slate-500 hover:bg-blue-50 hover:text-blue-600")}>
      <div className="flex items-center gap-3 font-bold text-sm">{icon}{label}</div>
      <ChevronRight size={14} className={cn("opacity-0 group-hover:opacity-100", active && "opacity-100")} />
    </Button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
      <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200">
        <Package size={40} className="text-slate-300" />
      </div>
      <h3 className="text-xl font-black text-slate-900">Belum ada pesanan</h3>
      <Button className="rounded-full px-8 bg-blue-600 font-bold">Mulai Belanja</Button>
    </div>
  );
}