"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Filter, Package, ImagePlus, ImageIcon } from "lucide-react";

export default function ProductCatalogPage() {
  const [category, setCategory] = useState("Semua");
  const [products, setProducts] = useState([
    { 
      name: "AC Panasonic 1 PK", 
      category: "AC", 
      price: "4500000", 
      image: "https://p-id.pstatic.net/83/831411/530598501_600.jpg" 
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "AC",
    price: "",
    image: "", // Field baru untuk foto
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 HANDLE UPLOAD FOTO
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // ... (Fungsi handleAdd, handleEdit, handleDelete, handleSubmit tetap sama dengan tambahan field image di form)

  const handleSubmit = () => {
    if (!form.name || !form.price) return;
    if (isEdit && editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = form;
      setProducts(updated);
    } else {
      setProducts([...products, form]);
    }
    setShowModal(false);
  };

  function handleEdit(i: number): void {
    throw new Error("Function not implemented.");
  }

  function handleDelete(i: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Katalog Produk</h1>
          <p className="text-muted-foreground text-sm">Kelola produk beserta foto unitnya.</p>
        </div>
        <Button onClick={() => { setForm({ name: "", category: "AC", price: "", image: "" }); setIsEdit(false); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Produk
        </Button>
      </div>

      {/* TABLE CARD */}
      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-20">Foto</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.filter(p => category === "Semua" || p.category === category).map((product, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt="prod" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                <TableCell className="font-semibold">Rp {Number(product.price).toLocaleString("id-ID")}</TableCell>
                <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(i)}><Pencil className="w-4 h-4 text-yellow-600" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(i)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* MODAL DIALOG */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader><DialogTitle>{isEdit ? "Edit Produk" : "Tambah Produk"}</DialogTitle></DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Foto Upload Section */}
            <div className="flex flex-col items-center gap-4">
               <div className="w-32 h-32 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden bg-muted relative group">
                  {form.image ? (
                    <>
                      <img src={form.image} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => setForm({...form, image: ""})}>
                         <Trash2 className="text-white w-6 h-6" />
                      </div>
                    </>
                  ) : (
                    <label className="flex flex-col items-center gap-2 cursor-pointer">
                      <ImagePlus className="w-8 h-8 text-muted-foreground" />
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">Upload Foto</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  )}
               </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Nama Produk</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Kategori</label>
                <select 
                  className="w-full h-10 border rounded-md px-3 text-sm"
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="AC">AC</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Harga</label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button onClick={handleSubmit}>Simpan Produk</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}