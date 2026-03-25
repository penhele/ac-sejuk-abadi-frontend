"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import AboutDialog from "@/components/admin/AboutDialog";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const handleAdd = (item: any) => {
    setData([...data, item]);
  };

  const handleDelete = (index: number) => {
    if (confirm("Hapus data ini?")) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">About Us Management</h1>
          <p className="text-sm text-muted-foreground">Kelola info penghargaan, anggota, dan sponsor.</p>
        </div>

        <Button onClick={() => setOpen(true)} className="gap-2">
          + Tambah Data
        </Button>
      </div>

      {/* 🔥 GRID CARD VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length === 0 && (
          <p className="text-muted-foreground text-sm col-span-full text-center py-10 border-2 border-dashed rounded-xl">
            Belum ada data. Klik tombol "Tambah Data" untuk memulai.
          </p>
        )}

        {data.map((item, i) => (
          <Card key={i} className="overflow-hidden flex flex-col">
            {/* Multi Image Gallery Preview */}
            <div className="bg-muted p-2 grid grid-cols-2 gap-1 h-48">
              {item.images && item.images.slice(0, 4).map((img: string, idx: number) => (
                <div key={idx} className={`relative overflow-hidden rounded ${
                  item.images.length === 1 ? "col-span-2 row-span-2" : 
                  item.images.length === 2 ? "row-span-2" : ""
                }`}>
                  <img src={img} className="w-full h-full object-cover" alt="portfolio" />
                  {/* Overlay if images > 4 */}
                  {idx === 3 && item.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                      +{item.images.length - 4} Lainnya
                    </div>
                  )}
                </div>
              ))}
            </div>

            <CardContent className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="capitalize">
                  {item.section}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive h-8 w-8" 
                  onClick={() => handleDelete(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AboutDialog
        open={open}
        setOpen={setOpen}
        onSave={handleAdd}
      />
    </div>
  );
}