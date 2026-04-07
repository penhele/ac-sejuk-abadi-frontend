"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Plus, Package, Tag, Hash, MoreVertical, Edit, Trash2 } from "lucide-react";
// Pastikan import interface Product sesuai dengan yang kita buat di form
import { ProductForm, Product } from "@/components/admin/forms/product-form";

export default function ProductCatalogPage() {
  // 1. Initial Form disesuaikan dengan field Backend Produk
  const initialForm: Product = {
    id_brand: 1,
    name: "",
    description: "",
    type: "smartphone",
    price: 0,
    quantity: 0,
    pk: "",
    category_ids: [],
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Handle Submit (Simulasi hit API)
  const handleSubmit = (file: File | null) => {
    setIsLoading(true);
    
    // Simulasi delay API
    setTimeout(() => {
      if (isEdit && editIndex !== null) {
        const updated = [...products];
        updated[editIndex] = form as Product;
        setProducts(updated);
      } else {
        // Tambahkan ID dummy untuk simulasi list
        const newProduct = { ...form, id: Math.floor(Math.random() * 1000) } as Product;
        setProducts([...products, newProduct]);
      }
      
      setIsLoading(false);
      setShowModal(false);
    }, 800);
  };

  const handleDelete = (i: number) => {
    if (confirm("Hapus produk ini dari katalog?")) {
      setProducts(products.filter((_, index) => index !== i));
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Katalog Produk</h1>
          <p className="text-muted-foreground">Kelola inventaris, harga, dan SKU (PK) produk Anda.</p>
        </div>
        <Button 
          onClick={() => { setForm(initialForm); setIsEdit(false); setShowModal(true); }} 
          className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" /> Tambah Produk
        </Button>
      </div>

      {/* Table Section */}
      <Card className="border shadow-sm overflow-hidden rounded-2xl">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">Info Produk</TableHead>
              <TableHead className="font-semibold text-slate-700">Brand & PK</TableHead>
              <TableHead className="font-semibold text-slate-700">Stok</TableHead>
              <TableHead className="font-semibold text-slate-700">Harga</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-slate-400 italic">
                  Belum ada produk. Klik "Tambah Produk" untuk memulai.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, i) => (
                <TableRow key={i} className="hover:bg-slate-50/50 transition-colors">
                  {/* Info Produk */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{product.name}</span>
                      <span className="text-xs text-slate-500 line-clamp-1">{product.description}</span>
                      <div className="flex gap-1 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 uppercase">
                          {product.type}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Brand & PK */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Tag className="w-3 h-3" /> Brand ID: {product.id_brand}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-mono text-slate-500">
                        <Hash className="w-3 h-3" /> {product.pk}
                      </div>
                    </div>
                  </TableCell>

                  {/* Stok */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      <span className={`font-semibold ${product.quantity < 10 ? 'text-red-500' : 'text-slate-700'}`}>
                        {product.quantity}
                      </span>
                    </div>
                  </TableCell>

                  {/* Harga */}
                  <TableCell>
                    <span className="font-bold text-slate-900">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                  </TableCell>

                  {/* Aksi */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => { setForm(product); setEditIndex(i); setIsEdit(true); setShowModal(true); }}
                        className="h-8 w-8 p-0 rounded-lg border-slate-200"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(i)}
                        className="h-8 w-8 p-0 rounded-lg border-slate-200 hover:bg-red-50 hover:border-red-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Form Dialog Component */}
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