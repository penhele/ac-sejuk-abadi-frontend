"use client";

import { useAppForm } from "@/hooks/use-app-form";
import SelectInput from "../inputs/select-input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "@/services/product.service";
import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import { getBrandsQueryOptions } from "@/hooks/queries/brand-queries";
import { getAcTypesQueryOptions } from "@/hooks/queries/ac-type-queries";

export default function CreateProductForm() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });

      toast.success("Produk berhasil ditambahkan.");
      form.reset();
    },
    onError: () => {
      toast.error("Gagal menambahkan produk.");
    },
  });

  const form = useAppForm({
    defaultValues: {
      name: "",
      description: "",
      id_brand: "",
      id_category: "",
      id_ac_type: "",
      pk: "",
      price: "",
      quantity: "",
    },
    onSubmit: async ({ value }) => {
      mutate({
        name: value.name,
        description: value.description,
        pk: value.pk,

        id_brand: Number(value.id_brand),
        id_category: Number(value.id_category),
        id_ac_type: Number(value.id_ac_type),

        price: Number(value.price),
        quantity: Number(value.quantity),
      });
    },
  });

  const { data: categories, isPending: isPendingCategory } = useQuery(
    getCategoriesQueryOptions(),
  );
  const categoryOptions =
    categories?.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    })) ?? [];

  const { data: brands, isPending: isPendingBrand } = useQuery(
    getBrandsQueryOptions(),
  );
  const brandOptions =
    brands?.map((brand) => ({
      label: brand.name,
      value: brand.id.toString(),
    })) ?? [];

  const { data: acTypes, isPending: isPendingAcType } = useQuery(
    getAcTypesQueryOptions(),
  );
  const acTypeOptions =
    acTypes?.map((acType) => ({
      label: acType.name,
      value: acType.id.toString(),
    })) ?? [];

  const pkOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
  ];

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-5 gap-between-items-lg">
          <div className="col-span-3 space-y-between-items-lg">
            <form.AppField
              name="name"
              children={(field) => (
                <field.TextField
                  label="Nama Produk"
                  placeholder="Daikin Zeta 2 PK"
                />
              )}
            />
            <form.AppField
              name="description"
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
              <form.AppField
                name="id_brand"
                children={(field) => (
                  <field.SelectField
                    label="Brand"
                    placeholder="Pilih Brand"
                    options={brandOptions}
                    disabled={isPendingBrand}
                  />
                )}
              />
              <form.AppField
                name="id_category"
                children={(field) => (
                  <field.SelectField
                    label="Kategori"
                    placeholder="Pilih Kategori"
                    options={categoryOptions}
                    disabled={isPendingCategory}
                  />
                )}
              />
              <form.AppField
                name="id_ac_type"
                children={(field) => (
                  <field.SelectField
                    label="Type AC"
                    placeholder="Pilih Tipe AC"
                    options={acTypeOptions}
                    disabled={isPendingAcType}
                  />
                )}
              />
              <form.AppField
                name="pk"
                children={(field) => (
                  <field.SelectField
                    label="PK"
                    placeholder="Pilih PK"
                    options={pkOptions}
                  />
                )}
              />

              <form.AppField
                name="price"
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
                name="quantity"
                children={(field) => (
                  <field.TextField
                    label="Stok"
                    type="number"
                    placeholder="10"
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-x-between-items">
          {/* <Button variant={"outline"}>Batal</Button> */}

          <form.SubmitButton label="Submit" />
        </div>
      </form>
    </form.AppForm>
  );
}
