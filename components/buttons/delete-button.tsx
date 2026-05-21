import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { deleteProduct } from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";

export default function DeleteButton({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onMutate() {
      const toastId = toast.loading("Loading...");
      return { toastId };
    },
    onSuccess(_, __, context) {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });

      toast.success("Berhasil menghapus produk.", {
        id: context?.toastId,
      });
    },
    onError(_, __, context) {
      toast.error("Gagal menghapus produk.", {
        id: context?.toastId,
      });
    },
  });

  return (
    <DropdownMenuItem onClick={() => mutate(id)}>
      Delete
      <DropdownMenuShortcut>
        <Trash size={12} />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
