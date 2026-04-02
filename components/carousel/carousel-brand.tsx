"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselBrand() {
  const brandLogo = [
    { src: "/daikin.png", name: "Daikin" },
    { src: "/aqua.png", name: "Aqua" },
    { src: "/changhong.png", name: "Changhong" },
    { src: "/gree.png", name: "Gree" },
    { src: "/lg.png", name: "LG" },
    { src: "/midea.png", name: "Midea" },
    { src: "/panasonic.png", name: "Panasonic" },
    { src: "/polytron.png", name: "Polytron" },
    { src: "/samsung.png", name: "Samsung" },
    { src: "/panasonic.png", name: "Panasonic" },
    { src: "/daikin.png", name: "Daikin" },
    { src: "/aqua.png", name: "Aqua" },
    { src: "/changhong.png", name: "Changhong" },
    { src: "/gree.png", name: "Gree" },
    { src: "/lg.png", name: "LG" },
    { src: "/midea.png", name: "Midea" },
    { src: "/panasonic.png", name: "Panasonic" },
    { src: "/polytron.png", name: "Polytron" },
    { src: "/samsung.png", name: "Samsung" },
  ];

  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {brandLogo.map((item, index) => (
          <CarouselItem key={index} className="basis-auto">
            <div className="relative h-6 w-fit mx-4 flex items-center justify-center">
              <img
                src={item.src}
                alt={item.name}
                className="h-full w-auto object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
