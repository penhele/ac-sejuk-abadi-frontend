"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ProjectImages } from "../types/project-images";

type ProjectImageGalleryProps = {
  images: ProjectImages[];
  projectName: string;
  className?: string;
};

export default function ProjectImageGallery({
  images,
  projectName,
  className,
}: ProjectImageGalleryProps) {
  const totalImages = images.length;

  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return;

      mainApi.scrollTo(index);
    },
    [mainApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi) return;

    const activeIndex = mainApi.selectedScrollSnap();

    setSelectedIndex(activeIndex);
    thumbApi?.scrollTo(activeIndex);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;

    onSelect();

    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  return (
    <div className={cn("grid grid-cols-12 gap-4 w-full", className)}>
      {/* Main Image */}
      <Carousel setApi={setMainApi} className="w-full relative col-span-9">
        <CarouselContent className="ml-0">
          {images.map((img, index) => (
            <CarouselItem key={img.id ?? index} className="pl-0">
              <AspectRatio
                ratio={16 / 9}
                className="bg-muted rounded-md overflow-hidden relative"
              >
                <Image
                  src={img.image_url}
                  alt={`${projectName}-image-${index}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnails */}
      {totalImages > 1 ? (
        <Carousel
          setApi={setThumbApi}
          orientation="vertical"
          opts={{
            containScroll: "keepSnaps",
            dragFree: true,
          }}
          className="col-span-3"
        >
          <CarouselContent className="-mt-2 h-full">
            {images.map((img, index) => (
              <CarouselItem
                key={`thumb-${img.id ?? index}`}
                className="pt-2 basis-1/5"
              >
                <button
                  type="button"
                  onClick={() => onThumbClick(index)}
                  className="w-full"
                >
                  <AspectRatio
                    ratio={16 / 9}
                    className={cn(
                      "relative overflow-hidden rounded-md border-2 transition-all",
                      index === selectedIndex
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={img.image_url}
                      alt={`${projectName}-thumb-${index}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </AspectRatio>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="col-span-3 invisible" />
      )}
    </div>
  );
}
