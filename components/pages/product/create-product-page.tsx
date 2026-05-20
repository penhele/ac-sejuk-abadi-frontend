import SelectInput from "@/components/inputs/select-input";
import { TextareaInput, TextInput } from "@/components/inputs/text-input";
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
          <div className="grid grid-cols-5 gap-between-items-lg">
            <div className="col-span-3 space-y-between-items-lg">
              <TextInput
                label="Nama Produk"
                placeholder="Contoh: Daikin Zeta Inverter 2 PK"
              />
              <TextareaInput
                label="Deskripsi"
                placeholder="Opsi kendali via WiFi melalui aplikasi yang tersedia bagi perangkat berbasis Android dan iOS..."
              />
            </div>

            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-between-items-lg">
                <SelectInput label="Brand" placeholder="Pilih Brand" />
                <SelectInput label="Kategori" placeholder="Pilih Kategori" />
                <SelectInput label="Tipe AC" placeholder="Pilih Tipe AC" />
                <SelectInput label="PK" placeholder="Pilih PK" />

                <TextInput
                  label="Harga (Rp)"
                  placeholder="2000000"
                  type="number"
                  isPrice
                />
                <TextInput label="Stok" type="number" placeholder="10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-x-between-items">
        <Button variant={"outline"}>Batal</Button>

        <Button>Simpan</Button>
      </div>
    </div>
  );
}
