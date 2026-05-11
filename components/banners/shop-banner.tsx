"use client";

import getBannersQueryOptions from "@/hooks/queries/banner-queries";
import { useQuery } from "@tanstack/react-query";
import CarouselBanner from "../carousel/carousel-banner";

export default function ShopBanner() {
  const { data: response } = useQuery(getBannersQueryOptions());

  const banners = response || [];

  return <CarouselBanner banners={banners} />;
}
