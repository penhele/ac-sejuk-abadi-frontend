"use client";

import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { Trash, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";

interface Props<TId = string | number> {
  id: TId;
  mutationFn: (id: TId) => Promise<unknown>;
  queryKey: readonly unknown[];
  successMessage?: string;
  errorMessage?: string;
  item: string;
}

export default function DeleteButton<TId = string | number>({
  id,
  mutationFn,
  queryKey,
  successMessage = "Berhasil menghapus data",
  item,
}: Props<TId>) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn,
  });

  const handleDelete = () => {
    goeyToast.promise(mutateAsync(id), {
      loading: "Loading...",
      success: () => {
        queryClient.invalidateQueries({ queryKey });
        return successMessage;
      },
      error: (err) => (err as AppError).message,

      description: {
        success: `Berhasil menghapus ${item} dari database`,
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuShortcut>
          <Button size={"icon-xs"} variant={"outline"} disabled={isPending}>
            {isPending ? <Spinner /> : <Trash />}
          </Button>
        </DropdownMenuShortcut>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 />
          </AlertDialogMedia>

          <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col space-y-2">
            <span>
              Apakah Anda yakin ingin menghapus data ini secara permanen?
            </span>

            <div className="p-4 bg-muted/50 flex flex-col rounded-lg">
              <span className="text-sm text-muted-foreground">
                Data yang akan dihapus:
              </span>
              <span className="text-base font-bold">{item}</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
