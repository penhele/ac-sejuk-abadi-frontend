"use client";

import EditProductForm from "@/components/forms/product/edit-product-form";
import ImageGrid from "@/components/grid/image-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-between-items">
      <div>
        <h1 className="text-2xl font-semibold">Edit Produk</h1>
        <span className="text-sm text-gray-600">
          Masukkan detail informasi produk AC, spesifikasi, dan gambar untuk
          ditambahkan ke katalog.
        </span>
      </div>

      <div className="grid grid-cols-3 space-x-between-items">
        <ImageGrid id={id} />

        <Card className="col-span-2 h-fit">
          <CardContent>
            <EditProductForm id={id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
