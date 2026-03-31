"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { ProductTableRow } from "@/components/admin/shared/product-table-row";
import { ProductForm } from "@/components/admin/forms/product-form";
import { Product } from "@/types/product";

export default function ProductCatalogPage() {
  const initialForm: Product = {
    name: "", category: "AC", price: "", images: [],
    specs: { brand: "", type: "", series: "", produksi: "", pk: "", watt: "", label: "1", btu: "", refrigerant: "R-32", warranty: "", dimensiindoor: "", dimensioutdoor: "", beratindoor: "", beratoutdoor: "", ukuranpipa: "" }
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (isEdit && editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = form;
      setProducts(updated);
    } else {
      setProducts([...products, form]);
    }
    setShowModal(false);
  };

  const handleDelete = (i: number) => {
    if (confirm("Hapus produk ini?")) {
      setProducts(products.filter((_, index) => index !== i));
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Katalog Produk</h1>
          <p className="text-muted-foreground">Kelola unit dan spesifikasi teknis produk.</p>
        </div>
        <Button onClick={() => { setForm(initialForm); setIsEdit(false); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Tambah Produk
        </Button>
      </div>

      <Card className="border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-24">Produk</TableHead>
              <TableHead>Detail Unit</TableHead>
              <TableHead>Spesifikasi Ringkas</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, i) => (
              <ProductTableRow 
                key={i} 
                product={product} 
                onEdit={() => { setForm(product); setEditIndex(i); setIsEdit(true); setShowModal(true); }}
                onDelete={() => handleDelete(i)}
              />
            ))}
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
      />
    </div>
  );
}