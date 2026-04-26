"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { getMe, updateMe } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilLine, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { UpdateUserPayload } from "@/types/user";

export default function PersonaLInformationForm() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const handleDisabled = () => {
    setIsEditing((prev) => !prev);
  };

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });

  const mutation = useMutation({
    mutationFn: (newData: UpdateUserPayload) => updateMe(data?.id!, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });

      setIsEditing(false);

      toast.success("Berhasil menyimpan data");
    },
  });

  const { handleSubmit, AppField } = useAppForm({
    defaultValues: {
      first_name: data?.first_name ?? "",
      last_name: data?.last_name ?? "",
      email: data?.email ?? "",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="border p-8 rounded-lg space-y-8 "
    >
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-semibold">Informasi Personal</h1>

        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={handleDisabled}
          type={isEditing ? "button" : "submit"}
        >
          {isEditing ? <Save /> : <PencilLine />}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AppField
          name="first_name"
          children={(field) => (
            <field.TextField label="Nama Depan" isDisable={!isEditing} />
          )}
        />
        <AppField
          name="last_name"
          children={(field) => (
            <field.TextField label="Nama Belakang" isDisable={!isEditing} />
          )}
        />
        <AppField
          name="email"
          children={(field) => (
            <field.TextField label="Email" isDisable={!isEditing} />
          )}
        />
      </div>
    </form>
  );
}
