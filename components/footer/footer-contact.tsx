"use client";

import { getCompanyQueryOptions } from "@/hooks/queries/company-queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";

export default function FooterContact({ className }: { className?: string }) {
  const { data: company } = useQuery(getCompanyQueryOptions);

  const contactList = [
    {
      Icon: MapPin,
      title: "Lokasi",
      value: company?.location,
    },
    { Icon: Phone, title: "No. Telepon", value: company?.phone },
    { Icon: Mail, title: "Email", value: company?.email },
  ];

  return (
    <div className={cn("space-y-between-items-sm", className)}>
      <h1 className="font-semibold text-xs tracking-widest uppercase">
        Hubungi kami
      </h1>

      <div className="flex flex-col sm:flex-row lg:flex-col space-y-2 space-x-8">
        {contactList.map((item, index) => (
          <div className="flex gap-4 items-center" key={index}>
            <div className="border w-8 h-8 items-center flex justify-center rounded-lg">
              <item.Icon size={24} />
            </div>
            <div className="flex flex-col">
              <span>{item.title}</span>
              <span className="text-sm text-gray-600">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
