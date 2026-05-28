"use client";

import CancelButton from "@/components/buttons/cancel-button";
import { ROUTES } from "@/constants/routes";
import { getAcTypesQueryOptions } from "@/hooks/queries/ac-type-queries";
import { getBrandsQueryOptions } from "@/hooks/queries/brand-queries";
import { getCategoriesQueryOptions } from "@/hooks/queries/category-queries";
import { useAppForm } from "@/hooks/use-app-form";
import { formatNumber } from "@/lib/format/currency";
import {
  createProductSchema,
  ProductFormValues,
} from "@/schemas/product.schema";
import { revalidateLogic } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";

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
    { label: "1/2", value: "1/2" },
    { label: "3/4", value: "3/4" },
    { label: "1", value: "1" },
    { label: "1 1/2", value: "1 1/2" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "8", value: "8" },
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
                  isDisabled={isFetching}
                  label="Nama Produk"
                  placeholder="Daikin Zeta 2 PK"
                />
              )}
            />
            <form.AppField
              name="description"
              children={(field) => (
                <field.TextareaField
                  isDisabled={isFetching}
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
                    disabled={isPendingBrand || isFetching}
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
                    disabled={isPendingCategory || isFetching}
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
                    disabled={isPendingAcType || isFetching}
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
                    isDisabled={isFetching}
                    label="Harga (Rp)"
                    type="number"
                    isPrice
                    placeholder={formatNumber("2000000")}
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
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-x-between-items flex flex-row">
          <CancelButton
            isDisabled={isFetching || false}
            onCancel={() => form.reset()}
            onCloseEdit={() => ({})}
            className="max-w-24"
            href={ROUTES.PRODUCTS}
          />

          <form.SubmitButton label={submitLabel} />
        </div>
      </form>
    </form.AppForm>
  );
}
