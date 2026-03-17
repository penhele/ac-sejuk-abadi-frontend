import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const topBrandList = [
    { name: "Daikin" },
    { name: "Samsung" },
    { name: "LG" },
    { name: "Panasonic" },
    { name: "Changhong" },
  ];

  const categoryList = [
    { name: "Split AC" },
    { name: "Cassette AC" },
    { name: "Floor Standing AC" },
    { name: "Portable AC" },
    { name: "Window AC" },
    { name: "Central / Ducted AC" },
  ];

  const contactList = [
    {
      Icon: MapPin,
      value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    { Icon: Phone, value: "1234-5678-9000" },
    { Icon: Mail, value: "john@doe.com" },
  ];

  return (
    <div className="bg-gray-100 mt-8">
      <div className="max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-4">
          <div className="space-y-2">
            <div className="relative w-40 h-16">
              <Image src="/logo.png" alt="" fill className="object-contain" />
            </div>

            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
              consequuntur.
            </p>

            <div className="flex flex-row gap-1">
              <FaWhatsapp className="text-gray-700 hover:scale-110" />
              <FaInstagram className="text-gray-700 hover:scale-110" />
              <FaFacebookF className="text-gray-700 hover:scale-110" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-medium">Top Brand</h1>

            <div className="flex flex-col gap-1">
              {topBrandList.map((item, index) => (
                <Link href={""} className="text-sm" key={index}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-medium">Category</h1>

            <div className="flex flex-col gap-1">
              {categoryList.map((item, index) => (
                <Link href={""} className="text-sm" key={index}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-medium">Kontak</h1>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.3021764198857!2d106.81717667478497!3d-6.349912062123265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed007042b1c1%3A0xad5a9a5e28f1f5a!2sPT.Alfa%20Cakrawala%20Sejuk%20Abadi!5e1!3m2!1sen!2sid!4v1773647008309!5m2!1sen!2sid"
              className="w-full h-48 rounded-sm"
            />

            <div className="space-y-1">
              {contactList.map((item, index) => (
                <div className="flex flex-row gap-2 items-start" key={index}>
                  <item.Icon className="size-4 shrink-0 mt-0.5" />
                  <span className="text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
