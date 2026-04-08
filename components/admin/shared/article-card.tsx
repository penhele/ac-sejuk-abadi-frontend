"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Tag, Calendar } from "lucide-react";

interface ArticleCardProps {
  // Selaraskan dengan JSON Backend: name, description, images[]
  item: { 
    id: number;
    name: string; 
    description: string; 
    category: string;
    created_at?: string;
    images?: any[] 
  };
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleCard({ item, onEdit, onDelete }: ArticleCardProps) {
  // Ambil gambar pertama dari array images, jika tidak ada pakai placeholder
  const displayImage = item.images && item.images.length > 0 
    ? (item.images[0].url || item.images[0]) 
    : "/placeholder-article.jpg"; // Pastikan ada file ini di folder public atau gunakan URL placeholder

  // Format tanggal sederhana
  const formattedDate = item.created_at 
    ? new Date(item.created_at).toLocaleDateString("id-ID", { 
        day: "numeric", 
        month: "short", 
        year: "numeric" 
      })
    : "Baru saja";

  return (
    <Card className="overflow-hidden group border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 rounded-[2rem]">
      <CardContent className="p-0">
        {/* Container Gambar */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={displayImage}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Badge Kategori */}
          <div className="absolute top-3 left-3">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-slate-100">
              <Tag className="w-3 h-3 text-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                {item.category || "Umum"}
              </span>
            </div>
          </div>
        </div>

        {/* Konten Teks */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-slate-400 text-[10px] mb-2">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>

          <h3 className="font-bold text-slate-900 leading-snug line-clamp-2 min-h-12 group-hover:text-blue-600 transition-colors">
            {item.name}
          </h3>
          
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {item.description || "Tidak ada deskripsi singkat untuk artikel ini."}
          </p>

          {/* Tombol Aksi */}
          <div className="mt-5 flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex-1 gap-2 rounded-xl border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all font-semibold"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              className="flex-1 gap-2 rounded-xl bg-red-50 hover:bg-red-600 shadow-sm shadow-red-100 transition-all font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hapus
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}