"use";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";
import { ProductImages } from "@/features/product/types/product-images";

export default function CarouselProductBasic({
  images,
  className,
}: {
  images: ProductImages[];
  className?: string;
}) {
  return (
    <Carousel className={className}>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative aspect-square">
              <Image
                src={image.image_url}
                alt={`${image.image_url}-${image.id}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
