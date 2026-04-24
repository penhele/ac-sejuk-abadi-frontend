import { useAppForm } from "@/hooks/use-app-form";
import { getMe } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { PencilLine, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function PersonaLInformationForm() {
  const [isEditing, setIsEditing] = useState(false);

  const handleDisabled = () => {
    setIsEditing((prev) => !prev);
  };

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getMe(),
  });

  const { handleSubmit, AppField } = useAppForm({
    defaultValues: {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
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

        <Button variant={"outline"} onClick={handleDisabled}>
          {isEditing ? <PencilLine /> : <Save />}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AppField
          name="first_name"
          children={(field) => (
            <field.TextField label="Nama Depan" isDisable={isEditing} />
          )}
        />
        <AppField
          name="last_name"
          children={(field) => (
            <field.TextField label="Nama Belakang" isDisable={isEditing} />
          )}
        />
        <AppField
          name="email"
          children={(field) => (
            <field.TextField label="Email" isDisable={isEditing} />
          )}
        />
      </div>
    </form>
  );
}
