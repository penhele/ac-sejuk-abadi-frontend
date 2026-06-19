import CreateProductForm from "@/features/product/components/create-product-form";

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

      <CreateProductForm />
    </div>  
  );
}
