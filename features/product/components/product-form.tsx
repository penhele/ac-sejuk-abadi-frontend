"use client";

import CancelButton from "@/components/buttons/cancel-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { getAcTypesQueryOptions } from "@/features/acType/queries/ac-type-queries";
import { useBrands } from "@/features/brand/hooks/use-brands";
import { getCategoriesQueryOptions } from "@/features/category/queries/category-queries";
import {
  createProductSchema,
  ProductFormValues,
} from "@/features/product/schemas/product.schema";
import { useAppForm } from "@/hooks/use-app-form";
import { formatNumber } from "@/lib/format/currency";
import { revalidateLogic } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useProductName } from "../hooks/use-product-name";

export default function ProductForm({
  defaultValues,
  onSubmit,
  submitLabel = "Submit",
  isFetching,
}: {
  defaultValues: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
  submitLabel?: string;
  isFetching?: boolean;
}) {
  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: createProductSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    onSubmit: async ({ value }) => {
      await onSubmit(value);
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

  const { data: brands, isPending: isPendingBrand } = useBrands();
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
    { label: "1/2", value: "1/2" },
    { label: "3/4", value: "3/4" },
    { label: "1", value: "1" },
    { label: "1 1/2", value: "1 1/2" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "8", value: "8" },
  ];

  const productName = useProductName({
    form,
    brandOptions,
    categoryOptions,
    acTypeOptions,
  });

  useEffect(() => {
    if (!productName) return;

    form.setFieldValue("name", productName);
  }, [productName]);

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="grid grid-cols-2 gap-between-field"
      >
        <Card className="col-span-2">
          <CardContent>
            <form.AppField
              name="name"
              children={(field) => (
                <field.TextField
                  isDisabled={isFetching}
                  label="Nama Produk"
                  placeholder="Daikin Zeta 2 PK"
                  readOnly
                  className="col-span-8"
                />
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Klasifikasi Produk</CardTitle>
          </CardHeader>

          <CardContent className="space-y-between-card">
            <form.AppField
              name="id_brand"
              children={(field) => (
                <field.SelectField
                  label="Brand"
                  placeholder="Pilih Brand"
                  options={brandOptions}
                  className="col-span-2"
                  disabled={isPendingBrand || isFetching}
                />
              )}
            />
            <form.AppField
              name="id_category"
              children={(field) => (
                <field.SelectField
                  label="Tipe Kompresor"
                  placeholder="Pilih Kategori"
                  options={categoryOptions}
                  className="col-span-2"
                  disabled={isPendingCategory || isFetching}
                  isOpsional
                />
              )}
            />
            <form.AppField
              name="id_ac_type"
              children={(field) => (
                <field.SelectField
                  label="Jenis Produk"
                  placeholder="Pilih Jenis Produk"
                  options={acTypeOptions}
                  className="col-span-2"
                  isOpsional
                  disabled={isPendingAcType || isFetching}
                />
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spesifikasi & Inventori</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-4 gap-between-field">
            <form.AppField
              name="pk"
              children={(field) => (
                <field.SelectField
                  label="Kapasitas"
                  placeholder="Pilih PK"
                  options={pkOptions}
                  isOpsional
                />
              )}
            />

            <form.AppField
              name="series_name"
              children={(field) => (
                <field.TextField
                  label="Nama Seri"
                  placeholder="Flash Thailand"
                />
              )}
            />
            <form.AppField
              name="freon_type"
              children={(field) => (
                <field.TextField
                  label="Jenis Freon"
                  placeholder="R32 / R4104"
                  isOpsional
                />
              )}
            />
            <form.AppField
              name="model_code"
              children={(field) => (
                <field.TextField
                  label="Kode Model"
                  placeholder="STKC15NV"
                  isOpsional
                />
              )}
            />

            <form.AppField
              name="price"
              children={(field) => (
                <field.TextField
                  isDisabled={isFetching}
                  label="Harga (Rp)"
                  type="number"
                  isPrice
                  placeholder={formatNumber("2000000")}
                  className="col-span-2"
                  isOpsional
                />
              )}
            />
            <form.AppField
              name="quantity"
              children={(field) => (
                <field.TextField
                  isDisabled={isFetching}
                  label="Stok"
                  type="number"
                  placeholder="10"
                  className="col-span-2"
                />
              )}
            />

            <form.AppField
              name="description"
              children={(field) => (
                <field.TextareaField
                  isDisabled={isFetching}
                  label="Deskripsi"
                  placeholder="Detail fitur produk, garansi, opsi kendala pintar, dll..."
                  className="col-span-4"
                  isOpsional
                />
              )}
            />
          </CardContent>
        </Card>

        <div className="space-x-between-items flex flex-row">
          <CancelButton
            isDisabled={isFetching || false}
            onCancel={() => form.reset()}
            onCloseEdit={() => ({})}
            className="max-w-24"
          />

          <form.SubmitButton label={submitLabel} />
        </div>
      </form>
    </form.AppForm>
  );
}
