import BackButton from "@/components/buttons/back-button";
import EditProductForm from "./edit-product-form";

interface Props {
  id: string;
}

export default async function EditProductPage({ id }: Props) {
  return (
    <div className="space-y-between-items">
      <BackButton />

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
