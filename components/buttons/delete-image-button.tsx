import { X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage } from "@/services/product.service";
import { toast } from "sonner";
import { getProductByIdQueryOptions } from "@/hooks/queries/product-queries";

export default function DeleteImageButton({
  className,
  idProduct,
  idImage,
}: {
  className?: string;
  idProduct: string | number;
  idImage: string | number;
}) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteImage(idProduct, idImage),
    onMutate() {
      const toastId = toast.loading("Loading...");
      return { toastId };
    },
    onSuccess(_, __, context) {
      toast.success("Berhasil menghapus gambar", { id: context.toastId });

      queryClient.invalidateQueries(
        getProductByIdQueryOptions(idProduct.toString()),
      );
    },
    onError(_, __, context) {
      toast.error("Gagal menghapus error", { id: context?.toastId });
    },
  });

  return (
    <Button
      className={cn(className, "rounded-full")}
      size={"icon-xs"}
      variant={"outline"}
      onClick={() => {
        mutate();
      }}
    >
      <X />
    </Button>
  );
}
