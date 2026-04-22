"use client";

import { useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselBanner({
  banner,
}: {
  banner: { src: string; name: string }[];
}) {
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    }),
  );

  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
      }}
      plugins={[autoplay.current]}
    >
      <CarouselContent className="flex items-center gap-4">
        {banner.map((item, index) => (
          <CarouselItem key={index}>
            <AspectRatio ratio={3 / 1} className="overflow-hidden rounded-lg">
              <img
                src={item.src}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
