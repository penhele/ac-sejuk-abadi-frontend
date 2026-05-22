"use client";

import { useEffect, useState } from "react";

import { getCompanyQueryOptions } from "@/hooks/queries/company-queries";
import { useAppForm } from "@/hooks/use-app-form";
import { updateCompany } from "@/services/company.service";
import { UpdateCompanyPayload } from "@/types/company";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function EditCompanyForm({ className }: { className?: string }) {
  const [isEditing, setIsEditing] = useState(false);

  const { data: company } = useQuery(getCompanyQueryOptions());

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateCompanyPayload) => updateCompany(data),

    onSuccess() {
      toast.success("Berhasil memperbarui data");
      setIsEditing(false);
    },

    onError(error) {
      toast.error(error.message);
    },
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
      mutate(value);
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
                isDisabled={!isEditing || isPending}
                keepStyleWhenDisabled
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
                isDisabled={!isEditing || isPending}
                keepStyleWhenDisabled
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
                    isDisabled={!isEditing || isPending}
                    keepStyleWhenDisabled
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
                    isDisabled={!isEditing || isPending}
                    keepStyleWhenDisabled
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
                isDisabled={!isEditing || isPending}
                keepStyleWhenDisabled
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
                isDisabled={!isEditing || isPending}
                keepStyleWhenDisabled
              />
            );
          }}
        />

        {isEditing ? (
          <div className="grid grid-cols-2 gap-between-items">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>

            <form.SubmitButton
              label={isPending ? "Updating..." : "Update"}
              className="w-full"
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
