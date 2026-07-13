"use client";

import { ROUTES } from "@/constants/routes";
import { addProduct, Product, productKeys } from "@/features/product";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { useRouter } from "next/navigation";
import ProductForm from "./product-form";

export default function CreateProductForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: addProduct,
    onSuccess(data: Product) {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      const productId = data.id;

      router.push(ROUTES.DASHBOARD_UPLOAD_PRODUCT_IMAGES(productId));
    },
  });

  const handleSubmit = (value: any) => {
    goeyToast.promise(mutateAsync(value), {
      loading: "Loading...",
      success: "Berhasil",
      error: (err) => (err as AppError).message,
    });
  };

  return (
    <ProductForm
      defaultValues={{
        name: "",
        description: undefined,
        id_brand: "",
        id_category: undefined,
        id_ac_type: undefined,
        pk: undefined,
        price: "",
        quantity: "",
        freon_type: undefined,
        model_code: undefined,
        series_name: undefined,
      }}
      onSubmit={handleSubmit}
      submitLabel="Save & Continue to Media Upload"
    />
  );
}
