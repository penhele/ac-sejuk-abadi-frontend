import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";
import { Project } from "../types/project";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface Props {
  project: Project;
}

export default function ProjectImages({ project }: Props) {
  const images = project.images ?? [];
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
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="h-120 relative bg-muted rounded-lg w-full flex flex-col items-center justify-center">
            <ImageOff className="h-16 w-16 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Gambar tidak tersedia
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (totalImages === 1) {
    return (
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="h-120 relative bg-muted rounded-lg w-full overflow-hidden">
            <Image
              src={images[0].image_url}
              alt={`${project.name}-image`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Carousel setApi={setMainApi} className="flex-1">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="h-120 relative bg-muted rounded-lg w-full overflow-hidden">
                <Image
                  src={img.image_url}
                  alt={`${project.name}-image-${index}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-1/4">
        <div className="h-120 flex flex-col gap-4 overflow-y-auto">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onThumbClick(index)}
              className="w-full block text-left focus:outline-none"
            >
              <div
                className={cn(
                  "aspect-video relative bg-muted rounded-lg overflow-hidden transition-all duration-200 border-2",
                  index === selectedIndex
                    ? " opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={img.image_url}
                  alt={`${project.name}-thumb-${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
