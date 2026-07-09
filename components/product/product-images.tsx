"use main";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Product } from "@/features/product/types/product";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ProductImagesProps {
  product: Product;
  className?: string;
}

export default function ProductImages({
  product,
  className,
}: ProductImagesProps) {
  const images = product.images ?? [];
  const totalImages = images.length;

  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const activeIndex = mainApi.selectedScrollSnap();
    setSelectedIndex(activeIndex);
    thumbApi.scrollTo(activeIndex);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();

    mainApi.on("select", onSelect).on("reInit", onSelect);
  }, [mainApi, onSelect]);

  if (totalImages === 0) {
    return (
      <div className={cn("w-full", className)}>
        <AspectRatio
          ratio={1 / 1}
          className="bg-muted rounded-md flex flex-col space-y-2 items-center justify-center h-full"
        >
          <ImageOff className="h-10 w-10 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">No Image</span>
        </AspectRatio>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <Carousel setApi={setMainApi} className="w-full relative">
        <CarouselContent className="ml-0">
          {images.map((img, index) => (
            <CarouselItem key={img.id ?? index} className="pl-0">
              <AspectRatio
                ratio={1 / 1}
                className="bg-muted rounded-md overflow-hidden relative"
              >
                <Image
                  src={img.image_url}
                  alt={`${product.name}-image-${index}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  priority={index === 0}
                  className="object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {totalImages > 1 && (
        <Carousel
          setApi={setThumbApi}
          opts={{
            containScroll: "keepSnaps",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 flex flex-row">
            {images.map((img, index) => (
              <CarouselItem
                key={`thumb-${img.id ?? index}`}
                className="pl-2 basis-1/5 select-none"
              >
                <button
                  type="button"
                  onClick={() => onThumbClick(index)}
                  className="w-full block text-left focus:outline-none"
                >
                  <AspectRatio
                    ratio={1 / 1}
                    className={cn(
                      "bg-muted rounded-md relative overflow-hidden transition-all duration-200 border-2",
                      index === selectedIndex
                        ? "border-primary opacity-100 ring-2 ring-primary/20"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={img.image_url}
                      alt={`${product.name}-thumb-${index}`}
                      fill
                      sizes="10vw"
                      className="object-cover"
                    />
                  </AspectRatio>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
