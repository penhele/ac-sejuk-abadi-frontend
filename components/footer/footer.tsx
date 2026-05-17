import { getSponsoredBrands } from "@/services/brand.service";
import { getCompany } from "@/services/company.service";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FooterList from "../lists/footer-list";
import SponsoredBrandList from "../lists/sponsored-brand-list";
import Maps from "../maps/maps";
import { Separator } from "../ui/separator";
import { ROUTES } from "@/contants/routes";

export default async function Footer() {
  const categoryList = [
    { name: "AC Split Wall", href: "/shop?category=split" },
    { name: "AC Cassette", href: "/shop?category=cassette" },
    { name: "AC Floor Standing", href: "/shop?category=floor" },
    { name: "AC Split Duct", href: "/shop?category=duct" },
    { name: "AC Inverter", href: "/shop?category=inverter" },
    { name: "AC Portable", href: "/shop?category=portable" },
  ];

  const quickLinks = [
    { name: "Tentang Kami", href: "/about-us" },
    { name: "Layanan Kami", href: "/services" },
    { name: "Proyek / Portofolio", href: ROUTES.PORTOFOLIO },
    { name: "Katalog Produk", href: ROUTES.SHOP },
    { name: "Hubungi Kami", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const sponsoredBrands = await getSponsoredBrands();
  const company = await getCompany();

  const contactList = [
    {
      Icon: MapPin,
      title: "Lokasi",
      value: company.location,
    },
    { Icon: Phone, title: "No. Telepon", value: company.phone },
    { Icon: Mail, title: "Email", value: company.email },
  ];

  return (
    <footer className="border-t mt-12">
      <div className="max-w-7xl mx-auto py-8 px-page-inline xl:px-0">
        <div className="space-y-16">
          <div className="grid grid-cols-4 gap-4 space-y-4">
            <div className="space-y-2 col-span-4 xl:col-span-1">
              <div className="relative h-16 w-32">
                <Image
                  src={"/logo.png"}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              <Separator />

              <p className="text-sm leading-relaxed text-gray-600">
                Penyedia solusi pendingin udara (AC) terbaik dengan pengalaman
                lebih dari 10 tahun. Kami berkomitmen memberikan kenyamanan
                udara untuk setiap ruangan Anda.
              </p>

              <div className="flex space-x-2">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                  <Link href={""} key={index}>
                    <Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-4 xl:col-span-3 grid grid-cols-3">
              <SponsoredBrandList
                title="Top Brand"
                sponsoredBrand={sponsoredBrands}
              />
              <FooterList title="Category" list={categoryList} />
              <FooterList title="Informasi" list={quickLinks} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="space-y-4 flex-1">
              <h1 className="font-semibold text-xs tracking-widest uppercase">
                Lokasi kami
              </h1>

              <Maps className="w-full rounded-lg h-20 sm:h-56" />
            </div>

            <div className="space-y-4 min-w-3xs">
              <h1 className="font-semibold text-xs tracking-widest uppercase">
                Hubungi kami
              </h1>

              <div className="flex flex-col sm:flex-row lg:flex-col space-y-2 space-x-8">
                {contactList.map((item, index) => (
                  <div className="flex gap-4 items-center" key={index}>
                    <div className="border w-8 h-8 items-center flex justify-center rounded-lg">
                      <item.Icon size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      <span className="text-sm text-gray-600">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Separator />

            <div className="text-xs flex flex-col md:flex-row justify-between font-medium space-y-2">
              <p>© 2026 PT. Alfa Cakrawala Sejuk Abadi. All rights reserved.</p>

              <div className="flex w-full justify-start md:justify-end gap-8">
                <Link href="/privacy" className="hover: transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover: transition-colors">
                  Terms of Service
                </Link>
                <Link
                  href="/cookie-policy"
                  className="hover: transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
