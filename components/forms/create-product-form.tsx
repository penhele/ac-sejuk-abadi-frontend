"use client";

import { useAppForm } from "@/hooks/use-app-form";
import SelectInput from "../inputs/select-input";

export default function CreateProductForm() {
  const form = useAppForm({});

  return (
    <div className="grid grid-cols-5 gap-between-items-lg">
      <div className="col-span-3 space-y-between-items-lg">
        <form.AppField
          name=""
          children={(field) => (
            <field.TextField
              label="Nama Produk"
              placeholder="Daikin Zeta 2 PK"
            />
          )}
        />
        <form.AppField
          name=""
          children={(field) => (
            <field.TextareaField
              label="Deskripsi"
              placeholder="Opsi kendali via WiFi melalui aplikasi yang tersedia bagi perangkat berbasis Android dan iOS..."
            />
          )}
        />
      </div>

      <div className="col-span-2">
        <div className="grid grid-cols-2 gap-between-items-lg">
          <SelectInput label="Brand" placeholder="Pilih Brand" />
          <SelectInput label="Kategori" placeholder="Pilih Kategori" />
          <SelectInput label="Tipe AC" placeholder="Pilih Tipe AC" />
          <SelectInput label="PK" placeholder="Pilih PK" />

          <form.AppField
            name=""
            children={(field) => (
              <field.TextField
                label="Harga (Rp)"
                type="number"
                isPrice
                placeholder="2000000"
              />
            )}
          />
          <form.AppField
            name=""
            children={(field) => (
              <field.TextField label="Stok" type="number" placeholder="10" />
            )}
          />
        </div>
      </div>
    </div>
  );
}
