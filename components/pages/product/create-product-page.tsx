import CreateProductForm from "@/components/forms/create-product-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateProductPage() {
  return (
    <div className="space-y-between-items">
      <div>
        <h1 className="text-2xl font-semibold">Tambah Produk Baru</h1>
        <span className="text-sm text-gray-600">
          Masukkan detail informasi produk AC, spesifikasi, dan gambar untuk
          ditambahkan ke katalog.
        </span>
      </div>

      <Card>
        <CardContent>
          <CreateProductForm />
        </CardContent>
      </Card>

      
    </div>
  );
}
