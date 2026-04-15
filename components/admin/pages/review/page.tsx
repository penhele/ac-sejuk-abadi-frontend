"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Trash2, Star, MessageSquare, Loader2, User, Calendar, AlertCircle 
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

  const fetchAllReviews = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Ambil semua produk terlebih dahulu
      const productsRes = await axios.get(`${API_URL}/products`);
      const products = productsRes.data.data || productsRes.data;

      if (!Array.isArray(products)) throw new Error("Gagal mengambil data produk");

      // 2. Ambil review untuk setiap produk secara paralel
      const reviewPromises = products.map((product: any) =>
        axios.get(`${API_URL}/products/${product.id}/reviews`)
          .then(res => res.data.data || res.data)
          .catch(() => []) 
      );

      const allReviewsNested = await Promise.all(reviewPromises);
      
      // 3. Gabungkan semua review menjadi satu array flat
      const flattenedReviews = allReviewsNested.flat();
      
      flattenedReviews.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setReviews(flattenedReviews);
    } catch (error) {
      console.error("Gagal load review:", error);
      toast.error("Gagal sinkronisasi data review.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllReviews();
  }, [fetchAllReviews]);

  const handleDelete = async (id: number, productId: string) => {
    if (!confirm("Hapus ulasan ini?")) return;

    const config = getAuthConfig();
    if (!config) return;

    setDeleteLoading(id);
    try {
      await axios.delete(`${API_URL}/products/${productId}/reviews/${id}`, config);
      setReviews((prev) => prev.filter((item) => item.id !== id));
      toast.success("Review dihapus.");
    } catch (error) {
      toast.error("Gagal menghapus review.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const renderStars = (rating: number) => (
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3 text-slate-900">
          <div className="bg-blue-600 p-2 rounded-2xl text-white">
            <MessageSquare className="w-6 h-6" />
          </div>
          Review Pelanggan (Semua Produk)
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Menampilkan feedback gabungan dari seluruh katalog produk.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            <p className="mt-4 text-slate-400 font-medium">Menghubungkan data produk & review...</p>
          </div>
        ) : reviews.length > 0 ? (
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-6 pl-8 font-bold">Pelanggan</TableHead>
                <TableHead className="font-bold">Rating & Ulasan</TableHead>
                <TableHead className="font-bold">Tanggal</TableHead>
                <TableHead className="text-right pr-8 font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="py-6 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                        {item.customer_name?.[0] || "U"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{item.customer_name || "Guest"}</span>
                        <span className="text-[10px] text-blue-500 font-semibold uppercase">Product ID: {item.product_id || item.productId}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="space-y-2">
                      {renderStars(item.rating)}
                      <p className="text-sm text-slate-600 italic">"{item.comment}"</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Calendar size={14} />
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </div>
                  </TableCell>
                  <TableCell className="py-6 pr-8 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id, item.product_id || item.productId)}
                      disabled={deleteLoading === item.id}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      {deleteLoading === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-32">
            <AlertCircle className="w-12 h-12 text-slate-200 mb-4" />
            <p className="text-slate-400">Tidak ada review ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}