"use client";

import EducationCard from "./cards/education-card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { HeaderSection } from "./util/header";
import Autoplay from "embla-carousel-autoplay";

export default function EducationSection() {
  const jenisAc = [
    { jenis: "AC Split", image: "/iklan.png" },
    { jenis: "AC Window", image: "/iklan.png" },
    { jenis: "AC Portable", image: "/iklan.png" },
    { jenis: "AC Cassette", image: "/iklan.png" },
    { jenis: "AC Standing Floor", image: "/iklan.png" },
    { jenis: "AC Central", image: "/iklan.png" },
  ];

  return (
    <div className="">
      <div className="">
        <HeaderSection title="Sistem AC Central dan Ventilasi" />

        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {jenisAc.map((item, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <EducationCard jenisAc={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* <div className="grid grid-cols-4 gap-8">
          {jenisAc.map((item, index) => (
            <div key={index}>
              <EducationCard jenisAc={item} />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
