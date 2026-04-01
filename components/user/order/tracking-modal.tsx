// src/app/orders/_components/tracking-modal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TrackingModal({ isOpen, onClose, order }: any) {
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