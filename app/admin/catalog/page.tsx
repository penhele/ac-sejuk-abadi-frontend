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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ImageIcon, ImagePlus, LayoutList } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductCatalogPage() {
  const [products, setProducts] = useState([
    {
      name: "Daikin AC Wall Mounted Split Standard Breeze 1/2 PK",
      category: "AC",
      price: "3500000",
      image: "https://lirp.cdn-website.com/a94dfc3e/dms3rep/multi/opt/Feature+Card+Star+Inverter+Website+-+07-1920w.jpg",
      specs: {
        brand: "DAIKIN",
        type: "AC Standard",
        pk: "0.5 PK",
        watt: "390 Watt",
        btu: "5000 BTU/h",
        refrigerant: "R-32",
        warranty: "1 Thn Sparepart, 3 Thn Kompresor",
        dimensi: "280 x 730 x 213 mm (Indoor)",
      },
    },
  ]);

  const initialForm = {
    name: "",
    category: "AC",
    price: "",
    image: "",
    specs: {
      brand: "",
      type: "",
      pk: "",
      watt: "",
      btu: "",
      refrigerant: "R-32",
      warranty: "",
      dimensi: "",
    },
  };

  const [form, setForm] = useState(initialForm);
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
    setForm(initialForm);
  };

  const handleEdit = (i: number) => {
    setForm(products[i]);
    setEditIndex(i);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (i: number) => {
    if (confirm("Hapus produk ini?")) {
      setProducts(products.filter((_, index) => index !== i));
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Katalog Produk</h1>
          <p className="text-muted-foreground">Kelola unit dan spesifikasi teknis produk.</p>
        </div>
        <Button onClick={() => { setForm(initialForm); setIsEdit(false); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Tambah Produk
        </Button>
      </div>

      {/* TABLE */}
      <Card className="border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-20">Produk</TableHead>
              <TableHead>Detail Unit</TableHead>
              <TableHead>Spesifikasi Ringkas</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, i) => (
              <TableRow key={i} className="group">
                <TableCell>
                  <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden border flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt="unit" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{product.name}</span>
                    <Badge variant="outline" className="w-fit mt-1 text-[10px]">{product.category}</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-1 text-slate-600">
                    <p>⚡ {product.specs.watt} | ❄️ {product.specs.btu}</p>
                    <p>🛠️ {product.specs.brand} - {product.specs.pk}</p>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-blue-600">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(i)} className="hover:bg-yellow-50">
                      <Pencil className="w-4 h-4 text-yellow-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(i)} className="hover:bg-red-50">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* MODAL INPUT & SPECS */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-175 p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl flex items-center gap-2">
              <LayoutList className="w-5 h-5 text-blue-600" />
              {isEdit ? "Edit Detail Produk" : "Tambah Produk Baru"}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[80vh] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT COLUMN: BASIC INFO & IMAGE */}
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl bg-slate-50 relative group">
                  {form.image ? (
                    <>
                      <img src={form.image} className="w-full h-40 object-contain" />
                      <Button size="icon" variant="destructive" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setForm({...form, image: ""})}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <label className="flex flex-col items-center gap-2 cursor-pointer py-8">
                      <ImagePlus className="w-10 h-10 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-500 uppercase">Upload Foto Unit</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nama Produk</label>
                  <Input placeholder="Contoh: Daikin Breeze 1/2 PK" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Harga (Rp)</label>
                    <Input type="number" placeholder="3500000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Kategori</label>
                    <select className="w-full h-10 border rounded-md px-3 text-sm bg-white" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      <option value="AC">AC</option>
                      <option value="Sparepart">Sparepart</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: TECHNICAL SPECS */}
              <div className="bg-slate-50 p-4 rounded-xl space-y-3 border">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Spesifikasi Teknis</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Brand</label>
                    <Input className="h-8 text-sm" value={form.specs.brand} onChange={(e) => setForm({...form, specs: {...form.specs, brand: e.target.value}})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Kapasitas PK</label>
                    <Input className="h-8 text-sm" placeholder="1/2 PK" value={form.specs.pk} onChange={(e) => setForm({...form, specs: {...form.specs, pk: e.target.value}})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Daya Listrik</label>
                    <Input className="h-8 text-sm" placeholder="390 Watt" value={form.specs.watt} onChange={(e) => setForm({...form, specs: {...form.specs, watt: e.target.value}})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Kapasitas (BTU)</label>
                    <Input className="h-8 text-sm" placeholder="5000 BTU/h" value={form.specs.btu} onChange={(e) => setForm({...form, specs: {...form.specs, btu: e.target.value}})} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Tipe Refrigerant</label>
                  <Input className="h-8 text-sm" placeholder="R-32" value={form.specs.refrigerant} onChange={(e) => setForm({...form, specs: {...form.specs, refrigerant: e.target.value}})} />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Garansi</label>
                  <Input className="h-8 text-sm" placeholder="1 Thn Sparepart, 3 Thn Kompresor" value={form.specs.warranty} onChange={(e) => setForm({...form, specs: {...form.specs, warranty: e.target.value}})} />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Dimensi Indoor/Outdoor</label>
                  <Input className="h-8 text-sm" placeholder="280 x 730 x 213 mm" value={form.specs.dimensi} onChange={(e) => setForm({...form, specs: {...form.specs, dimensi: e.target.value}})} />
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-6 bg-slate-50 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-8">Simpan ke Katalog</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}