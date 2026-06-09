"use client";

import EditProductForm from "@/components/forms/product/edit-product-form";
import UploadProductImageForm from "@/features/product/components/upload-product-image-form";
import ImageGrid from "@/features/product/components/image-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <UploadProductImageForm id={id} />

        <div className="col-span-2 flex flex-col gap-between-items">
          <Card className="">
            <CardContent>
              <EditProductForm id={id} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Foto Produk</CardTitle>
            </CardHeader>

            <CardContent>
              <ImageGrid id={id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
