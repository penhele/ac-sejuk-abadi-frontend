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
import { Plus, Pencil, Trash2, ImageIcon, ImagePlus, LayoutList, X, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductCatalogPage() {
  const [products, setProducts] = useState([
    {
      name: "Daikin AC Wall Mounted Split Standard Breeze 1/2 PK",
      category: "AC",
      price: "3500000",
      images: ["https://lirp.cdn-website.com/a94dfc3e/dms3rep/multi/opt/Feature+Card+Star+Inverter+Website+-+07-1920w.jpg"],
      specs: {
        brand: "DAIKIN",
        type: "AC Standard",
        series: "Breeze",
        produksi: "Indonesia",
        pk: "0.5 PK",
        watt: "390 Watt",
        label: "3", // Menggunakan angka untuk rating bintang
        btu: "5000 BTU/h",
        refrigerant: "R-32",
        warranty: "1 Thn Sparepart, 3 Thn Kompresor",
        dimensiindoor: "280 x 730 x 213 mm",
        dimensioutdoor: "540 x 660 x 290 mm",
        beratindoor: "7 kg",
        beratoutdoor: "21 kg",
        ukuranpipa: "3/8 inch - 1/4 inch",
      },
    },
  ]);

  const initialForm = {
    name: "",
    category: "AC",
    price: "",
    images: [] as string[],
    specs: {
      brand: "",
      type: "",
      series: "",
      produksi: "",
      pk: "",
      watt: "",
      label: "1",
      btu: "",
      refrigerant: "R-32",
      warranty: "",
      dimensiindoor: "",
      dimensioutdoor: "",
      beratindoor: "",
      beratoutdoor: "",
      ukuranpipa: "",
    },
  };

  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
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
          <p className="text-muted-foreground">Kelola unit dan spesifikasi teknis produk secara mendetail.</p>
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
              <TableHead className="w-24">Produk</TableHead>
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
                  <div className="flex -space-x-3 overflow-hidden p-1">
                    {product.images.length > 0 ? (
                      product.images.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="w-12 h-12 rounded-lg bg-white overflow-hidden border-2 border-white shadow-sm shrink-0">
                          <img src={img} alt="unit" className="w-full h-full object-cover" />
                        </div>
                      ))
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border flex items-center justify-center text-slate-300">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 leading-tight">{product.name}</span>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px]">{product.category}</Badge>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px] border-none">{product.specs.brand}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-[11px] space-y-0.5 text-slate-600">
                    <p>⚡ {product.specs.watt} | ❄️ {product.specs.btu}</p>
                    <p>📦 {product.specs.series} ({product.specs.produksi})</p>
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
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl flex items-center gap-2">
              <LayoutList className="w-5 h-5 text-blue-600" />
              {isEdit ? "Edit Detail Produk" : "Tambah Produk Baru"}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[80vh] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEFT COLUMN: BASIC INFO & IMAGES */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Foto Unit</label>
                  <div className="grid grid-cols-3 gap-2">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                    <label className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                      <ImagePlus className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                      <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nama Produk</label>
                  <Input placeholder="Nama lengkap produk..." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Harga (Rp)</label>
                    <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Kategori</label>
                    <select className="w-full h-10 border rounded-md px-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      <option value="AC">AC</option>
                      <option value="Sparepart">Sparepart</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Brand</label>
                    <Input value={form.specs.brand} onChange={(e) => setForm({...form, specs: {...form.specs, brand: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Label Bintang</label>
                    <select className="w-full h-10 border rounded-md px-3 text-sm" value={form.specs.label} onChange={(e) => setForm({...form, specs: {...form.specs, label: e.target.value}})}>
                      <option value="1">⭐</option>
                      <option value="2">⭐⭐</option>
                      <option value="3">⭐⭐⭐</option>
                      <option value="4">⭐⭐⭐⭐</option>
                      <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: DETAILED TECHNICAL SPECS */}
              <div className="bg-slate-50 p-5 rounded-xl space-y-4 border">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b pb-2">Spesifikasi Teknis</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Tipe</label>
                    <Input className="h-8 text-sm bg-white" placeholder="Standard/Inverter" value={form.specs.type} onChange={(e) => setForm({...form, specs: {...form.specs, type: e.target.value}})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Series</label>
                    <Input className="h-8 text-sm bg-white" placeholder="Breeze/Lite" value={form.specs.series} onChange={(e) => setForm({...form, specs: {...form.specs, series: e.target.value}})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Produksi</label>
                    <Input className="h-8 text-sm bg-white" placeholder="Indonesia/Thailand" value={form.specs.produksi} onChange={(e) => setForm({...form, specs: {...form.specs, produksi: e.target.value}})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Kapasitas PK</label>
                    <Input className="h-8 text-sm bg-white" placeholder="0.5 PK" value={form.specs.pk} onChange={(e) => setForm({...form, specs: {...form.specs, pk: e.target.value}})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Daya (Watt)</label>
                    <Input className="h-8 text-sm bg-white" value={form.specs.watt} onChange={(e) => setForm({...form, specs: {...form.specs, watt: e.target.value}})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">BTU/h</label>
                    <Input className="h-8 text-sm bg-white" value={form.specs.btu} onChange={(e) => setForm({...form, specs: {...form.specs, btu: e.target.value}})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Dimensi Indoor</label>
                    <Input className="h-8 text-sm bg-white" value={form.specs.dimensiindoor} onChange={(e) => setForm({...form, specs: {...form.specs, dimensiindoor: e.target.value}})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Dimensi Outdoor</label>
                    <Input className="h-8 text-sm bg-white" value={form.specs.dimensioutdoor} onChange={(e) => setForm({...form, specs: {...form.specs, dimensioutdoor: e.target.value}})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Berat Indoor</label>
                    <Input className="h-8 text-sm bg-white" value={form.specs.beratindoor} onChange={(e) => setForm({...form, specs: {...form.specs, beratindoor: e.target.value}})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Berat Outdoor</label>
                    <Input className="h-8 text-sm bg-white" value={form.specs.beratoutdoor} onChange={(e) => setForm({...form, specs: {...form.specs, beratoutdoor: e.target.value}})} />
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Ukuran Pipa</label>
                  <Input className="h-8 text-sm bg-white" value={form.specs.ukuranpipa} onChange={(e) => setForm({...form, specs: {...form.specs, ukuranpipa: e.target.value}})} />
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-6 bg-slate-50 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-8">Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}