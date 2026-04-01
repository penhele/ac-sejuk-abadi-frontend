"use client";

import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WishlistEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-24 text-center px-6"
    >
      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <PackageSearch className="w-12 h-12 text-slate-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Belum Ada Barang Impian?</h3>
      <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
        Mulai jelajahi katalog kami dan temukan AC terbaik untuk kenyamanan Anda.
      </p>
      <Button className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30">
        Jelajahi Produk Sekarang
      </Button>
    </motion.div>
  );
}