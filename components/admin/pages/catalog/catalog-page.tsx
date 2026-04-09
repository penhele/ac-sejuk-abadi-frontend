"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Tag, Edit, Trash2, Loader2, Package, Layers, Briefcase, RefreshCw } from "lucide-react";
import { ProductForm, Product } from "@/components/admin/forms/product-form";
import api from "@/src/services/api";

export default function AdminManagementPage() {
  // --- STATE DATA ---
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  // --- STATE UI ---
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  // --- STATE MODAL PRODUK ---
  const initialProductForm: Product = { 
    id_brand: 0, 
    name: "", 
    description: "", 
    type: "AC", 
    price: "", 
    quantity: 0, 
    pk: "", 
    category_ids: [] 
  };
  const [productForm, setProductForm] = useState<Partial<Product>>(initialProductForm);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);

  // --- FETCH SEMUA DATA ---
  const fetchData = async () => {
    setIsFetching(true);
    try {
      const [prodRes, brandRes, catRes] = await Promise.all([
        api.get("/products/"),
        api.get("/brands"),
        api.get("/categories")
      ]);
      
      setProducts(prodRes.data.data || prodRes.data || []);
      setBrands(brandRes.data.data || brandRes.data || []);
      setCategories(catRes.data.data || catRes.data || []);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLER DELETE UNIVERSAL ---
  const handleDelete = async (endpoint: string, id: any, name: string) => {
    if (confirm(`Hapus "${name}" secara permanen? Jika ini Brand/Kategori, pastikan tidak ada produk yang terikat.`)) {
      try {
        await api.delete(`${endpoint}/${id}`);
        alert("Data berhasil dihapus");
        fetchData();
      } catch (err: any) {
        console.error("Delete Error:", err.response?.data);
        const msg = err.response?.data?.message || "Gagal hapus karena relasi database (FK Constraint)";
        alert(`Error: ${msg}`);
      }
    }
  };

  // --- HANDLER BRAND & CATEGORY ---
  const handleAddBrand = async () => {
    const name = prompt("Masukkan Nama Brand Baru:");
    if (!name) return;
    try {
      await api.post("/brands", { name });
      fetchData();
    } catch (err) { alert("Gagal menambah brand"); }
  };

  const handleAddCategory = async () => {
    const name = prompt("Masukkan Nama Kategori Baru:");
    if (!name) return;
    try {
      await api.post("/categories", { name });
      fetchData();
    } catch (err) { alert("Gagal menambah kategori"); }
  };

  // --- HANDLER PRODUK ---
  const handleProductSubmit = async () => {
    setIsLoading(true);
    const payload = {
      ...productForm,
      id_brand: Number(productForm.id_brand),
      price: Number(productForm.price),
      quantity: Number(productForm.quantity),
      category_ids: Array.isArray(productForm.category_ids) 
        ? productForm.category_ids.map(id => Number(id)) 
        : []
    };

    try {
      if (isEditProduct && productForm.id) {
        await api.put(`/products/${productForm.id}`, payload);
      } else {
        await api.post("/products/", payload);
      }
      setShowProductModal(false);
      fetchData();
      alert("Produk berhasil disimpan");
    } catch (err: any) { 
      alert(`Gagal simpan: ${err.response?.data?.message || "Cek input data"}`); 
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Management</h1>
          <p className="text-muted-foreground italic text-sm">Pusat kendali produk, brand, dan kategori AC.</p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={isFetching} className="rounded-xl shadow-sm">
          <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} /> Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 rounded-xl p-1 bg-slate-100 h-12">
          <TabsTrigger value="products" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Package className="w-4 h-4 mr-2 text-blue-500"/> Produk
          </TabsTrigger>
          <TabsTrigger value="brands" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Briefcase className="w-4 h-4 mr-2 text-indigo-500"/> Brand
          </TabsTrigger>
          <TabsTrigger value="categories" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Layers className="w-4 h-4 mr-2 text-emerald-500"/> Kategori
          </TabsTrigger>
        </TabsList>

        {/* --- TAB PRODUK --- */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Daftar Inventaris AC</h2>
            <Button onClick={() => { setProductForm(initialProductForm); setIsEditProduct(false); setShowProductModal(true); }} className="bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all active:scale-95">
              <Plus className="w-4 h-4 mr-2" /> Tambah Produk
            </Button>
          </div>
          
          <Card className="rounded-2xl overflow-hidden border shadow-sm bg-white">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="py-4">Nama Produk</TableHead>
                  <TableHead>Spesifikasi</TableHead>
                  <TableHead>Harga & Stok</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" /><p className="mt-2 text-slate-400 text-sm">Memuat data produk...</p></TableCell></TableRow>
                ) : products.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-20 text-slate-400 font-medium">Belum ada produk terdaftar.</TableCell></TableRow>
                ) : (
                  products.map((p) => (
                    <TableRow key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div className="font-bold text-slate-900 leading-tight">{p.name}</div>
                        {/* FITUR COPY UUID UNTUK DISKON */}
                        <div className="mt-1.5 flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">UUID:</span>
                            <code className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 select-all cursor-help" title="Klik 2x lalu Copy untuk ID Diskon">
                              {p.id}
                            </code>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium uppercase">{p.type}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold bg-indigo-50 w-fit px-2 py-0.5 rounded-full mb-1">
                          <Tag className="w-3 h-3"/> {p.brand?.name || `Brand ID: ${p.id_brand}`}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">Kapasitas: <span className="text-slate-900">{p.pk} PK</span></div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-900 text-base">Rp {Number(p.price).toLocaleString("id-ID")}</div>
                        <div className={`text-xs mt-0.5 ${p.quantity < 5 ? "text-red-600 font-bold animate-pulse" : "text-slate-500"}`}>
                          Stok: {p.quantity} Unit
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => { 
                              const catIds = p.categories?.map((c: any) => c.id_category) || [];
                              setProductForm({...p, price: String(p.price), category_ids: catIds}); 
                              setIsEditProduct(true); 
                              setShowProductModal(true); 
                            }} 
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit className="w-4 h-4"/>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDelete("/products", p.id, p.name)} 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4"/>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* --- TAB BRAND --- */}
        <TabsContent value="brands" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Manajemen Brand</h2>
            <Button onClick={handleAddBrand} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md">
              <Plus className="w-4 h-4 mr-2" /> Tambah Brand
            </Button>
          </div>
          <Card className="rounded-2xl overflow-hidden border shadow-sm max-w-2xl bg-white">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Nama Brand</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((b) => (
                  <TableRow key={b.id} className="hover:bg-slate-50/50">
                    <TableCell className="text-slate-400 font-mono text-xs">#{b.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{b.name}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete("/brands", b.id, b.name)} className="text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4"/></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* --- TAB KATEGORI --- */}
        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Manajemen Kategori</h2>
            <Button onClick={handleAddCategory} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md">
              <Plus className="w-4 h-4 mr-2" /> Tambah Kategori
            </Button>
          </div>
          <Card className="rounded-2xl overflow-hidden border shadow-sm max-w-2xl bg-white">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((c) => (
                  <TableRow key={c.id} className="hover:bg-slate-50/50">
                    <TableCell className="text-slate-400 font-mono text-xs">#{c.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{c.name}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete("/categories", c.id, c.name)} className="text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4"/></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal Form Produk */}
      <ProductForm 
        open={showProductModal} 
        onOpenChange={setShowProductModal} 
        isEdit={isEditProduct} 
        form={productForm} 
        setForm={setProductForm} 
        onSubmit={handleProductSubmit} 
        isLoading={isLoading}
      />
    </div>
  );
}