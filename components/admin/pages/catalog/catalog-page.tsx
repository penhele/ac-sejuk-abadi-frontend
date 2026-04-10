"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Tag, Edit, Trash2, Loader2, Package, Layers, Briefcase, RefreshCw, Image as ImageIcon } from "lucide-react";

// Import Form yang baru dibuat
import { ProductForm, Product } from "@/components/admin/forms/product-form";
import { BrandForm } from "@/components/admin/forms/brand-form";
import { CategoryForm } from "@/components/admin/forms/category-form";
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

  // --- STATE MODALS ---
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // --- STATE EDIT DATA ---
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const initialProductForm: Product = { 
    id_brand: 0, name: "", description: "", type: "AC", price: "", quantity: 0, pk: "", category_ids: [] 
  };
  const [productForm, setProductForm] = useState<Partial<Product>>(initialProductForm);

  // --- FETCH DATA ---
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

  useEffect(() => { fetchData(); }, []);

  // --- HANDLERS ---

  const handleDelete = async (endpoint: string, id: any, name: string) => {
    if (confirm(`Hapus "${name}" permanen?`)) {
      try {
        await api.delete(`${endpoint}/${id}`);
        fetchData();
      } catch (err) { alert("Gagal hapus data"); }
    }
  };

  const handleProductSubmit = async () => {
    setIsLoading(true);
    const payload = { ...productForm, price: Number(productForm.price) };
    try {
      if (isEditProduct) await api.put(`/products/${productForm.id}`, payload);
      else await api.post("/products/", payload);
      setShowProductModal(false);
      fetchData();
    } catch (err) { alert("Gagal simpan produk"); }
    finally { setIsLoading(false); }
  };

  const handleBrandSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (selectedBrand) await api.put(`/brands/${selectedBrand.id}`, data);
      else await api.post("/brands", data);
      setShowBrandModal(false);
      fetchData();
    } catch (err) { alert("Gagal simpan brand"); }
    finally { setIsLoading(false); }
  };

  const handleCategorySubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (selectedCategory) await api.put(`/categories/${selectedCategory.id}`, data);
      else await api.post("/categories", data);
      setShowCategoryModal(false);
      fetchData();
    } catch (err) { alert("Gagal simpan kategori"); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Management</h1>
          <p className="text-muted-foreground italic text-sm">Pusat kendali produk, brand, dan kategori.</p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={isFetching} className="rounded-xl shadow-sm">
          <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} /> Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 rounded-xl p-1 bg-slate-100 h-12">
          <TabsTrigger value="products" className="rounded-lg data-[state=active]:bg-white shadow-sm">
            <Package className="w-4 h-4 mr-2 text-blue-500"/> Produk
          </TabsTrigger>
          <TabsTrigger value="brands" className="rounded-lg data-[state=active]:bg-white shadow-sm">
            <Briefcase className="w-4 h-4 mr-2 text-indigo-500"/> Brand
          </TabsTrigger>
          <TabsTrigger value="categories" className="rounded-lg data-[state=active]:bg-white shadow-sm">
            <Layers className="w-4 h-4 mr-2 text-emerald-500"/> Kategori
          </TabsTrigger>
        </TabsList>

        {/* --- TAB PRODUK --- */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Daftar Inventaris</h2>
            <Button onClick={() => { setProductForm(initialProductForm); setIsEditProduct(false); setShowProductModal(true); }} className="bg-blue-600 rounded-xl shadow-md">
              <Plus className="w-4 h-4 mr-2" /> Tambah Produk
            </Button>
          </div>
          <Card className="rounded-2xl overflow-hidden border shadow-sm bg-white">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Spesifikasi</TableHead>
                  <TableHead>Harga & Stok</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <code className="text-[10px] text-blue-600 bg-blue-50 px-1 rounded">{p.id}</code>
                    </TableCell>
                    <TableCell>
                      <BadgeBrand name={p.brand?.name} />
                      <div className="text-xs text-slate-500">{p.pk} PK</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold">Rp {Number(p.price).toLocaleString("id-ID")}</div>
                      <div className="text-xs text-slate-500">Stok: {p.quantity}</div>
                    </TableCell>
                    <TableCell className="text-right">
                       <ActionButtons onEdit={() => { setProductForm(p); setIsEditProduct(true); setShowProductModal(true); }} onDelete={() => handleDelete("/products", p.id, p.name)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* --- TAB BRAND --- */}
        <TabsContent value="brands" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Manajemen Brand</h2>
            <Button onClick={() => { setSelectedBrand(null); setShowBrandModal(true); }} className="bg-indigo-600 rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Tambah Brand
            </Button>
          </div>
          <Card className="rounded-2xl overflow-hidden border shadow-sm max-w-2xl bg-white">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Logo & Nama Brand</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="text-slate-400 font-mono text-xs">#{b.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border flex items-center justify-center overflow-hidden">
                          {b.image_url ? (
                            <img src={b.image_url} alt={b.name} className="object-contain w-full h-full p-1" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-slate-200" />
                          )}
                        </div>
                        <span className="font-bold text-slate-800">{b.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionButtons onEdit={() => { setSelectedBrand(b); setShowBrandModal(true); }} onDelete={() => handleDelete("/brands", b.id, b.name)} />
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
            <Button onClick={() => { setSelectedCategory(null); setShowCategoryModal(true); }} className="bg-emerald-600 rounded-xl">
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
                  <TableRow key={c.id}>
                    <TableCell className="text-slate-400 font-mono text-xs">#{c.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{c.name}</TableCell>
                    <TableCell className="text-right">
                      <ActionButtons onEdit={() => { setSelectedCategory(c); setShowCategoryModal(true); }} onDelete={() => handleDelete("/categories", c.id, c.name)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* --- RENDER SEMUA MODAL --- */}
      <ProductForm open={showProductModal} onOpenChange={setShowProductModal} isEdit={isEditProduct} form={productForm} setForm={setProductForm} onSubmit={handleProductSubmit} isLoading={isLoading} />
      <BrandForm open={showBrandModal} onOpenChange={setShowBrandModal} onSubmit={handleBrandSubmit} initialData={selectedBrand} isLoading={isLoading} />
      <CategoryForm open={showCategoryModal} onOpenChange={setShowCategoryModal} onSubmit={handleCategorySubmit} initialData={selectedCategory} isLoading={isLoading} />
    </div>
  );
}

// Sub-komponen kecil untuk merapikan kode
function BadgeBrand({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-1 text-[10px] text-indigo-600 font-bold bg-indigo-50 w-fit px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider">
      <Tag className="w-3 h-3"/> {name || "No Brand"}
    </div>
  );
}

function ActionButtons({ onEdit, onDelete }: { onEdit: () => void, onDelete: () => void }) {
  return (
    <div className="flex justify-end gap-1">
      <Button variant="ghost" size="sm" onClick={onEdit} className="text-blue-600 hover:bg-blue-50 rounded-lg">
        <Edit className="w-4 h-4"/>
      </Button>
      <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600 hover:bg-red-50 rounded-lg">
        <Trash2 className="w-4 h-4"/>
      </Button>
    </div>
  );
}