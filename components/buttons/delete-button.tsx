import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { deleteProduct } from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu";

export default function DeleteButton<TId = string | number>({
  id,
  label = "Delete",
  mutationFn,
  queryKey,
  successMessage = "Berhasil menghapus data.",
  errorMessage = "Gagal menghapus data.",
}: {
  id: TId;
  label?: string;
  mutationFn: (id: TId) => Promise<unknown>;
  queryKey: readonly unknown[];
  successMessage?: string;
  errorMessage?: string;
}) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn,
    onMutate() {
      const toastId = toast.loading("Loading...");
      return { toastId };
    },
    onSuccess(_, __, context) {
      queryClient.invalidateQueries({
        queryKey,
      });

      toast.success(successMessage, {
        id: context?.toastId,
      });
    },
    onError(_, __, context) {
      toast.error(errorMessage, {
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
