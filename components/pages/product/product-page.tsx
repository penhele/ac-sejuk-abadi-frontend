"use client";

import { Button } from "@/components/ui/button";
import { getProductsQueryOptions } from "@/hooks/queries/product-queries";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export default function ProductPage() {
  const { data: products } = useQuery(getProductsQueryOptions());

  return <div className=""></div>;
}
