"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getBannersQueryOptions } from "@/hooks/queries/banner-queries";
import { Banner } from "@/types/banner";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import BannerFallback from "../fallback/banner-fallback";

export default function CarouselBanner() {
  const { data: banners, isFetching } = useQuery(getBannersQueryOptions());

  if (banners?.length === 0 || isFetching) {
    return <BannerFallback />;
  }

  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
      }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="flex items-center gap-4">
        {banners?.map((banner, index) => (
          <CarouselItem key={index}>
            <AspectRatio
              ratio={3 / 1}
              className="overflow-hidden rounded-sm relative"
            >
              <img
                src={banner.image_url}
                alt={banner.name}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
