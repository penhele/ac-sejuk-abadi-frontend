"use client";

import { getCompanyQueryOptions } from "@/hooks/queries/company-queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function EditCompanyImageForm() {
  const { data: company } = useQuery(getCompanyQueryOptions());

  return (
    <div
      className={cn(
        "relative aspect-square border-2 bg-muted/50 border-dashed rounded-lg",
        company?.logo_url && "bg-white",
      )}
    >
      <Image
        src={company?.logo_url || ""}
        alt={`logo-${company?.name}` || "logo"}
        fill
        className="object-contain"
      />
    </div>
  );
}
