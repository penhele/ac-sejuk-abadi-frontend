"use client";

import { useParams } from "next/navigation";
import EditProductForm from "./edit-product-form";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-between-items">
      <div>
        <h1 className="text-2xl font-semibold">Edit Produk</h1>
        <span className="text-sm text-muted-foreground">
          Masukkan detail informasi produk AC, spesifikasi, dan gambar untuk
          ditambahkan ke katalog.
        </span>
      </div>

      <EditProductForm id={id} />
    </div>
  );
}
