"use client";

import { ROUTES } from "@/constants/routes";
import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { addProduct } from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProductForm from "./product-form";

export default function CreateProductForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });

      toast.success("Produk berhasil ditambahkan.");
      router.push(ROUTES.PRODUCTS);
    },
    onError: () => {
      toast.error("Gagal menambahkan produk.");
    },
  });

  return (
    <ProductForm
      defaultValues={{
        name: "",
        description: "",
        id_brand: "",
        id_category: "",
        id_ac_type: "",
        pk: "",
        price: "",
        quantity: "",
      }}
      onSubmit={async (value) => {
        await mutateAsync(value);
      }}
    />
  );
}
