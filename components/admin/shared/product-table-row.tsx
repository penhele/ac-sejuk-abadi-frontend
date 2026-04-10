"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ImageIcon, Zap, Snowflake, Box } from "lucide-react";

interface ProductRowProps {
  product: any; // Sesuaikan dengan interface Product kamu
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductTableRow({ product, onEdit, onDelete }: ProductRowProps) {
  // Ambil data gambar dari brand jika product.images kosong (sebagai fallback)
  const hasImages = product.images && product.images.length > 0;
  const brandLogo = product.brand?.image_url;

  return (
    <TableRow className="group hover:bg-slate-50/50 transition-colors">
      <TableCell>
        <div className="flex -space-x-3 overflow-hidden p-1">
          {hasImages ? (
            product.images.slice(0, 3).map((img: string, idx: number) => (
              <div key={idx} className="w-12 h-12 rounded-xl bg-white overflow-hidden border-2 border-white shadow-sm shrink-0">
                <img src={img} alt="unit" className="w-full h-full object-cover" />
              </div>
            ))
          ) : brandLogo ? (
            // Jika tidak ada gambar produk, tampilkan logo brand sebagai identitas
            <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden border-2 border-white shadow-sm shrink-0 flex items-center justify-center p-2">
              <img src={brandLogo} alt="brand logo" className="w-full h-full object-contain opacity-70" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-dashed flex items-center justify-center text-slate-300">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-slate-900 leading-tight">
            {product.name}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {/* Menampilkan brand dari relasi data terbaru */}
            {product.brand && (
              <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none text-[9px] font-bold px-2 py-0">
                {product.brand.name}
              </Badge>
            )}
            <Badge variant="outline" className="text-[9px] font-medium border-slate-200">
              {product.type || "AC"}
            </Badge>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="text-[11px] space-y-1 text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Snowflake className="w-3 h-3 text-blue-400" />
            <span>Kapasitas: <b className="text-slate-700">{product.pk} PK</b></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Box className="w-3 h-3 text-slate-400" />
            <span>Stok: <b className={product.quantity < 5 ? "text-red-600" : "text-slate-700"}>{product.quantity} Unit</b></span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Harga Unit</span>
          <span className="font-black text-blue-600 text-sm">
            Rp {Number(product.price).toLocaleString("id-ID")}
          </span>
        </div>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onEdit} 
            className="h-8 w-8 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-slate-400 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onDelete} 
            className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600 text-slate-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}