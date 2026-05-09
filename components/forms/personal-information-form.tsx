"use client";

import { useAppForm } from "@/hooks/use-app-form";
import { getMe, updateMe } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilLine, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { UpdateUserPayload } from "@/types/user";
import { cn } from "@/lib/utils";

export default function PersonaLInformationForm({
  className,
}: {
  className?: string;
}) {
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
      className={cn(
        "border p-inside-card rounded-lg space-y-8 shadow-xs",
        className,
      )}
    >
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold">Informasi Pribadi</h1>

        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={handleDisabled}
          type={isEditing ? "button" : "submit"}
        >
          {isEditing ? <Save /> : <PencilLine />}
        </Button>
      </div>

      <div className="">
        <AppField
          name="first_name"
          children={(field) => (
            <field.TextField
              label="Nama Depan"
              isDisable={!isEditing}
              isEditing={isEditing}
            />
          )}
        />
        <AppField
          name="last_name"
          children={(field) => (
            <field.TextField
              label="Nama Belakang"
              isDisable={!isEditing}
              isEditing={isEditing}
            />
          )}
        />
        <AppField
          name="email"
          children={(field) => (
            <field.TextField
              label="Email"
              isDisable={!isEditing}
              isEditing={isEditing}
            />
          )}
        />
      </div>
    </form>
  );
}
