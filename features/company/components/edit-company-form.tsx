"use client";

import CancelButton from "@/components/buttons/cancel-button";
import { useAppForm } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { AppError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { goeyToast } from "goey-toast";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { updateCompany } from "../api/update-company";
import { useCompany } from "../hooks/use-company";
import { UpdateCompanyPayload } from "../types/update-company-payload";

export default function EditCompanyForm({ className }: { className?: string }) {
  const [isEditing, setIsEditing] = useState(false);

  const { data: company } = useCompany();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateCompanyPayload) => updateCompany(data),
  });

  const form = useAppForm({
    defaultValues: {
      name: company?.name ?? "",
      description: company?.description ?? "",
      email: company?.email ?? "",
      phone: company?.phone ?? "",
      location: company?.location ?? "",
      location_url: company?.location_url ?? "",
    },

    onSubmit: ({ value }) => {
      goeyToast.promise(mutateAsync(value), {
        loading: "Loading",
        success: () => {
          setIsEditing(false);
          return "Berhasil";
        },
        error: (err) => (err as AppError).message,
      });
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className={cn("space-y-between-items w-full", className)}
      >
        <form.AppField
          name="name"
          children={(field) => {
            return (
              <field.TextField
                label="Company"
                isDisabled={isPending}
                readOnly={!isEditing}
              />
            );
          }}
        />

        <form.AppField
          name="description"
          children={(field) => {
            return (
              <field.TextareaField
                label="Description"
                isDisabled={isPending}
                readOnly={!isEditing}
              />
            );
          }}
        />

        <div className="flex flex-row space-x-between-items">
          <div className="flex-1">
            <form.AppField
              name="email"
              children={(field) => {
                return (
                  <field.TextField
                    label="Email"
                    type="email"
                    isDisabled={isPending}
                    readOnly={!isEditing}
                  />
                );
              }}
            />
          </div>

          <div className="flex-1">
            <form.AppField
              name="phone"
              children={(field) => {
                return (
                  <field.TextField
                    label="Phone"
                    type="number"
                    placeholder="62818355788"
                    isDisabled={isPending}
                    readOnly={!isEditing}
                  />
                );
              }}
            />
          </div>
        </div>

        <form.AppField
          name="location"
          children={(field) => {
            return (
              <field.TextField
                label="Location"
                isDisabled={isPending}
                readOnly={!isEditing}
              />
            );
          }}
        />

        <form.AppField
          name="location_url"
          children={(field) => {
            return (
              <field.TextField
                label="Location URL"
                isDisabled={isPending}
                readOnly={!isEditing}
              />
            );
          }}
        />

        {isEditing ? (
          <div className="grid grid-cols-2 gap-between-items">
            <CancelButton
              isDisabled={isPending}
              onCancel={() => form.reset()}
              onCloseEdit={() => setIsEditing(false)}
            />

            <form.SubmitButton
              label={"Update"}
              className="w-full"
              loading={isPending}
            />
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => {
              setIsEditing(true);
            }}
            className="w-full"
          >
            Edit
          </Button>
        )}
      </form>
    </form.AppForm>
  );
}
