"use client";

import { ROUTES } from "@/constants/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProductForm from "./product-form";
import { addProduct } from "@/features/product/api/add-product";
import { productKeys } from "@/features/product/queries";

export default function CreateProductForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
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
