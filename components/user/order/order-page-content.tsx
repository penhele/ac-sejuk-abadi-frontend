// src/app/orders/_components/order-page-content.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import Shared Component
import { UserSidebar } from "@/components/user/user-sidebar";

// Import Sub-components Terpisah
import { OrderCard } from "./order-card";
import { TrackingModal } from "./tracking-modal";

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

export default function OrderPageContent() {
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
    } else if (type === 'Beli Lagi') {
      toast.success("Produk berhasil ditambahkan ke keranjang");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl antialiased min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR - Sekarang menggunakan Shared Component */}
        <UserSidebar />

        {/* MAIN CONTENT */}
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
            <TabsList className="bg-slate-100/50 p-1 h-auto flex flex-wrap justify-start rounded-xl border border-slate-200/50">
              {["Semua", "Diproses", "Dikirim", "Selesai", "Dibatalkan"].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab.toLowerCase()} 
                  className="rounded-lg px-6 py-2.5 text-xs font-bold uppercase transition-all"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-8 space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderCard 
                      key={order.id} 
                      order={order} 
                      onAction={(type) => handleAction(type, order)} 
                    />
                  ))
                ) : (
                  <div className="py-20 text-center border-2 border-dashed rounded-3xl border-slate-100">
                    <p className="text-slate-400 font-medium">Tidak ada pesanan ditemukan.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </main>
      </div>

      <TrackingModal 
        isOpen={modalType === "tracking"} 
        onClose={() => setModalType(null)} 
        order={selectedOrder} 
      />
    </div>
  );
}