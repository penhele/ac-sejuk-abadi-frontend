"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useBanners } from "@/features/banner/hooks/use-banners";
import Autoplay from "embla-carousel-autoplay";
import BannerFallback from "./banner-fallback";
import Image from "next/image";

export default function CarouselBanner() {
  const { data: banners, isFetching } = useBanners();

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
            <div className="overflow-hidden rounded-sm relative aspect-video xs:aspect-2/1 lg:aspect-3/1 w-full h-full bg-muted">
              <Image
                fill
                src={banner.image_url}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 object-cover w-full h-full blur-xl scale-110 opacity-70"
              />

              <Image
                fill
                src={banner.image_url}
                alt={banner.name}
                className="absolute inset-0 object-contain w-full h-full z-10"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
