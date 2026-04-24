import { getMe, updateMe } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PencilLine, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { InputTextController } from "../inputs/input-text-controller";
import { useForm } from "react-hook-form";
import { User } from "@/types/user";
import { toast } from "sonner";

export default function PersonaLInformationForm() {
  const [isEditing, setIsEditing] = useState(false);

  const handleDisabled = () => {
    const handleDisabled = () => {
      setIsEditing((prev) => !prev);
    };
  };

  return (
    <div className="border p-8 rounded-lg space-y-8">
      <div className="flex flrow justify-between items-center">
        <h1 className="text-lg font-semibold">Informasi Personal</h1>

        {isEditing ? (
          <Button variant={"outline"} onClick={handleDisabled}>
            <PencilLine />
          </Button>
        ) : (
          <Button variant={"outline"} onClick={handleDisabled}>
            <Save />
          </Button>
        )}
      </div>

      <FieldGroup>
        {/* <div className="grid grid-cols-2 gap-4">
          <InputTextController
            label="Nama Depan"
            name="first_name"
            control={form.control}
            isDisabled={!isEditing}
          />
          <InputTextController
            label="Nama Belakang"
            name="last_name"
            control={form.control}
            isDisabled={!isEditing}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputTextController
            label="Email"
            name="email"
            control={form.control}
            isDisabled={!isEditing}
          />
          <Field className="">
            <FieldLabel>No. HP</FieldLabel>
            <Input disabled placeholder="1234567890" />
          </Field>
        </div> */}
      </FieldGroup>
    </div>
  );
}
