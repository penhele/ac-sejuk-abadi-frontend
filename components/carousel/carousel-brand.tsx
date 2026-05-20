"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getBrandsQueryOptions } from "@/hooks/queries/brand-queries";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselBrand() {
  const { data: brands } = useQuery(getBrandsQueryOptions());

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {brands?.map((brand, index) => (
          <CarouselItem key={index} className="basis-auto">
            <div className="relative h-4 xs:h-5 md:h-6 w-fit mx-2 xs:mx-4 flex items-center justify-center">
              {brand.image_url != null && (
                <img
                  src={brand.image_url}
                  alt={brand.name}
                  className="h-full w-auto object-contain"
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
