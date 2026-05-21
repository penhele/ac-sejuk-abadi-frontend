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
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });

      toast.success("Berhasil menghapus produk.");
    },
    onError() {
      toast.error("Gagal menghapus produk.");
    },
    onMutate() {
      toast.loading("Loading...");
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
