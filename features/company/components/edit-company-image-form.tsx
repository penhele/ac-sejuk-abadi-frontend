"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Spinner } from "../../../components/ui/spinner";
import { useCompany } from "../hooks/use-company";

export default function EditCompanyImageForm() {
  const { data: company } = useCompany();

  return (
    <div
      className={cn(
        "relative aspect-square border-2 bg-muted/50 border-dashed rounded-lg flex items-center justify-center",
        company?.logo_url && "bg-white",
      )}
    >
      {company?.logo_url ? (
        <Image
          src={company?.logo_url}
          alt={`logo-${company?.name}` || "logo"}
          fill
          className="object-contain"
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
