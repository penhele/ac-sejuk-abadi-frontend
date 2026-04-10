"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Star, 
  MessageSquare, 
  Loader2, 
  User,
  Calendar,
  AlertCircle
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "/api-backend/api";

export default function ReviewPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const getAuthConfig = useCallback(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      router.push("/login");
      return null;
    }
    return { headers: { Authorization: `Bearer ${token}` } };
  }, [router]);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/reviews`);
      const result = res.data.data || res.data;
      setReviews(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Gagal load review:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus ulasan ini secara permanen?")) return;

    const config = getAuthConfig();
    if (!config) return;

    setDeleteLoading(id);
    try {
      await axios.delete(`${API_URL}/reviews/${id}`, config);
      setReviews((prev) => prev.filter((item) => item.id !== id));
      alert("Review berhasil dihapus.");
    } catch (error: any) {
      alert("Gagal menghapus review.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3 text-slate-900">
          <div className="bg-blue-600 p-2 rounded-2xl text-white">
            <MessageSquare className="w-6 h-6" />
          </div>
          Review Pelanggan
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Pantau feedback dari pelanggan untuk meningkatkan kualitas layanan AC Sejuk Abadi.
        </p>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            <p className="mt-4 text-slate-400 font-medium">Mengambil feedback...</p>
          </div>
        ) : reviews.length > 0 ? (
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-50 font-bold py-6 pl-8">Pelanggan</TableHead>
                <TableHead className="font-bold">Rating & Ulasan</TableHead>
                <TableHead className="w-37.5 font-bold">Tanggal</TableHead>
                <TableHead className="w-25 text-right pr-8 font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((item) => (
                <TableRow key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="py-6 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <User size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{item.customer_name || "Guest"}</span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Pelanggan</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="space-y-2">
                      {renderStars(item.rating)}
                      <p className="text-sm text-slate-600 leading-relaxed max-w-md line-clamp-2 italic">
                        "{item.comment || "Tidak ada komentar."}"
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <Calendar size={14} />
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </div>
                  </TableCell>
                  <TableCell className="py-6 pr-8 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      disabled={deleteLoading === item.id}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      {deleteLoading === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="bg-slate-50 p-6 rounded-3xl mb-4">
              <AlertCircle className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Belum ada review</h3>
            <p className="text-slate-400 text-sm">Review dari aplikasi pelanggan akan muncul di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}