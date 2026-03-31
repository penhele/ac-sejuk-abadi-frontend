"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ImageIcon } from "lucide-react";
import { Product } from "@/types/product";

interface ProductRowProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductTableRow({ product, onEdit, onDelete }: ProductRowProps) {
  return (
    <TableRow className="group">
      <TableCell>
        <div className="flex -space-x-3 overflow-hidden p-1">
          {product.images.length > 0 ? (
            product.images.slice(0, 3).map((img, idx) => (
              <div key={idx} className="w-12 h-12 rounded-lg bg-white overflow-hidden border-2 border-white shadow-sm shrink-0">
                <img src={img} alt="unit" className="w-full h-full object-cover" />
              </div>
            ))
          ) : (
            <div className="w-12 h-12 rounded-lg bg-slate-100 border flex items-center justify-center text-slate-300">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 leading-tight">{product.name}</span>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className="text-[10px]">{product.category}</Badge>
            <Badge className="bg-blue-100 text-blue-700 text-[10px] border-none">{product.specs.brand}</Badge>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-[11px] space-y-0.5 text-slate-600">
          <p>⚡ {product.specs.watt} | ❄️ {product.specs.btu}</p>
          <p>📦 {product.specs.series} ({product.specs.produksi})</p>
        </div>
      </TableCell>
      <TableCell className="font-bold text-blue-600">
        Rp {Number(product.price).toLocaleString("id-ID")}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" onClick={onEdit} className="hover:bg-yellow-50">
            <Pencil className="w-4 h-4 text-yellow-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} className="hover:bg-red-50">
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}