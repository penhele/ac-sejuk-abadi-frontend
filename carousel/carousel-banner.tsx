"use client"

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
      <CarouselContent className="flex items-center gap-4 ">
        {banner.map((item, index) => (
          <CarouselItem key={index} className="">
            <AspectRatio ratio={3 / 1} className="">
              <img src={item.src} alt={item.src} className="" />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
