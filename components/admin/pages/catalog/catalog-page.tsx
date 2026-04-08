"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Plus, Tag, Edit, Trash2, Loader2 } from "lucide-react";
import { ProductForm, Product } from "@/components/admin/forms/product-form";
import api from "@/src/services/api"; 

export default function ProductCatalogPage() {
  const initialForm: Product = {
    id_brand: 1,
    name: "",
    description: "",
    type: "AC",
    price: "", 
    quantity: 0,
    pk: "",
    category_ids: [],
  };

  const [products, setProducts] = useState<any[]>([]); 
  const [form, setForm] = useState<Partial<Product>>(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const res = await api.get("/products/");
      const result = res.data;
      if (result && Array.isArray(result.data)) {
        setProducts(result.data);
      } else if (Array.isArray(result)) {
        setProducts(result);
      } else {
        setProducts([]); 
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setProducts([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sanitizePayload = (data: Partial<Product>) => {
    return {
      id_brand: Number(data.id_brand),
      name: data.name,
      description: data.description,
      type: data.type,
      price: Number(data.price), // Ubah ke Number sesuai format CURL
      quantity: Number(data.quantity),
      pk: data.pk,
      category_ids: Array.isArray(data.category_ids) 
        ? data.category_ids.map((id) => Number(id)) 
        : [],
    };
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const cleanData = sanitizePayload(form);

    try {
      if (isEdit && form.id) {
        // PUT tanpa trailing slash
        await api.put(`/products/${form.id}`, cleanData); 
      } else {
        // POST (sesuaikan trailing slash dengan dokumentasi BE kamu)
        await api.post("/products/", cleanData);
      }

      setShowModal(false);
      alert("Produk berhasil disimpan!");
      fetchProducts(); 
    } catch (err: any) {
      console.error("Error submit detail:", err.response?.data);
      const detailError = err.response?.data?.message || err.response?.data?.error || "Cek dashboard Vercel/Flask!";
      alert(`Gagal Simpan: ${detailError}`);
    } finally {
      setIsLoading(false);
    }
  };

  // PERBAIKAN UTAMA PADA DELETE
  const handleDelete = async (id: string) => {
    if (!id) return alert("ID Produk tidak ditemukan");

    if (confirm("Hapus produk ini secara permanen?")) {
      try {
        // Langsung panggil ID yang dikirim dari tombol
        const response = await api.delete(`/products/${id}`);
        
        console.log("Response Hapus Sukses:", response.data);
        alert("Produk berhasil dihapus");
        fetchProducts(); 
      } catch (err: any) {
        console.error("--- ERROR DELETE 500 ---");
        console.error("Detail:", err.response?.data);
        
        const errorMsg = err.response?.data?.message || err.response?.data?.error || "Gagal menghapus (Error 500)";
        alert(`Gagal menghapus: ${errorMsg}`);
      }
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Katalog Produk</h1>
          <p className="text-muted-foreground">Manajemen inventaris unit AC.</p>
        </div>
        <Button 
          onClick={() => { setForm(initialForm); setIsEdit(false); setShowModal(true); }} 
          className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" /> Tambah Produk
        </Button>
      </div>

      <Card className="border shadow-sm overflow-hidden rounded-2xl">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">Produk</TableHead>
              <TableHead className="font-semibold text-slate-700">Brand & PK</TableHead>
              <TableHead className="font-semibold text-slate-700">Stok</TableHead>
              <TableHead className="font-semibold text-slate-700">Harga</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-slate-400">
                  Belum ada produk terdaftar.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{product.name}</span>
                      <span className="text-xs text-slate-500 italic">{product.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs">
                      <span className="text-blue-600 font-medium flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {product.brand?.name || `ID: ${product.id_brand}`}
                      </span>
                      <span className="text-slate-500">PK: {product.pk}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={product.quantity <= 5 ? "text-red-500 font-bold" : ""}>
                      {product.quantity}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold text-slate-900">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => { 
                          const catIds = product.categories?.map((c: any) => c.id_category) || [];
                          setForm({ ...product, price: String(product.price), category_ids: catIds }); 
                          setIsEdit(true); 
                          setShowModal(true); 
                        }}
                        className="h-8 w-8 p-0 hover:border-blue-500 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(product.id)}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <ProductForm 
        open={showModal} 
        onOpenChange={setShowModal} 
        isEdit={isEdit} 
        form={form} 
        setForm={setForm} 
        onSubmit={handleSubmit} 
        isLoading={isLoading}
      />
    </div>
  );
}