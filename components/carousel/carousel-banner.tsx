"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Banner } from "@/types/banner";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselBanner({ banners }: { banners: Banner[] }) {
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
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <AspectRatio
              ratio={3 / 1}
              className="overflow-hidden rounded-lg relative"
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
