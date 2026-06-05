"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type Props<TId = string | number> = {
  id: TId;
  mutationFn: (id: TId) => Promise<unknown>;
  queryKey: readonly unknown[];
  successMessage?: string;
  errorMessage?: string;
};

export default function DeleteButton<TId = string | number>({
  id,
  mutationFn,
  queryKey,
  successMessage = "Berhasil menghapus data.",
  errorMessage = "Gagal menghapus data.",
}: Props<TId>) {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuShortcut>
          <Button size={"icon-xs"} variant={"outline"}>
            <Trash />
          </Button>
        </DropdownMenuShortcut>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus data ini secara permanen? Tindakan
            ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
