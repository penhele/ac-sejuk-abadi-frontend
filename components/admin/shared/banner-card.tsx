"use client";

import { Edit, Trash2, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Banner } from "@/components/admin/forms/banner-form"; // Import interface yang sudah kita buat

interface BannerCardProps {
  item: Banner; // Pastikan menggunakan interface Banner yang baru
  onEdit: () => void;
  onDelete: () => void;
}

export function BannerCard({ item, onEdit, onDelete }: BannerCardProps) {
  // Helper untuk format tanggal agar lebih enak dibaca
  const formatDate = (dateStr: string | Date) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Gambar Banner */}
      <div className="aspect-21/9 w-full overflow-hidden bg-slate-100">
        <img
          src={item.image || "https://via.placeholder.com/800x400?text=No+Image"}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Konten Data */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-slate-800 line-clamp-1">{item.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold border border-blue-100">
                Brand ID: {item.id_brand}
              </span>
              {item.category && (
                <span className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full border border-slate-100 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {item.category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Informasi Tanggal */}
        <div className="flex items-center gap-4 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(item.start_date)}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <span>{formatDate(item.end_date)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="flex-1 gap-2 rounded-xl border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
          >
            <Edit className="w-3.5 h-3.5" /> Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}