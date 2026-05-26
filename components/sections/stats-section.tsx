"use client";

import { getBrandsQueryOptions } from "@/hooks/queries/brand-queries";
import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { getProjectsQueryOptions } from "@/hooks/queries/project-queries";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import { Separator } from "../ui/separator";
import { AirVent } from "lucide-react";

export default function StatsSection() {
  const { data: projects } = useQuery(getProjectsQueryOptions());
  const { data: products } = useQuery(getProductsQueryOptions());
  const { data: brands } = useQuery(getBrandsQueryOptions());

  const statsList = [
    {
      Icon: AirVent,
      label: "Completed Projects",
      value: projects?.length ?? 0,
      className: "text-blue-500",
    },
    {
      Icon: AirVent,
      label: "Registered Brands",
      value: brands?.length ?? 0,
      className: "text-green-500",
    },
    {
      Icon: AirVent,
      label: "Available Products",
      value: products?.meta.total ?? 0,
      className: "text-yellow-500",
    },
    {
      Icon: AirVent,
      label: "Products Sold",
      value: 1248, // dummy data
      className: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 space-x-between-items">
      {statsList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-muted/50 rounded-lg py-4 space-y-between-items"
        >
          <item.Icon className={item.className} />

          <div className="space-y-1 flex flex-col items-center">
            <span className="text-3xl font-semibold">{item.value} +</span>
            <span className="text-gray-400 text-sm font-medium">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>

    // <div className="flex justify-evenly bg-primary py-8 rounded-lg">
    //   {statsList.map((stats, index) => (
    //     <Fragment key={index}>
    //       <div className="flex flex-col items-center space-y-2">
    //         <span className="text-3xl font-bold text-white">
    //           {stats.value}+
    //         </span>
    //         <span className="text-white">{stats.label}</span>
    //       </div>

    //       {index < statsList.length - 1 && <Separator orientation="vertical" />}
    //     </Fragment>
    //   ))}
    // </div>
  );
}
