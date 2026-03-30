import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import FooterList from "../lists/footer-list";

export default function Footer() {
  const topBrandList = [
    { name: "Daikin", href: "/shop?brand=daikin" },
    { name: "Samsung", href: "/shop?brand=samsung" },
    { name: "Gree", href: "/shop?brand=gree" },
    { name: "LG", href: "/shop?brand=lg" },
    { name: "Panasonic", href: "/shop?brand=panasonic" },
    { name: "Mitsubishi", href: "/shop?brand=mitsubishi" },
  ];

  const categoryList = [
    { name: "AC Split Wall", href: "/shop?category=split" },
    { name: "AC Cassette", href: "/shop?category=cassette" },
    { name: "AC Floor Standing", href: "/shop?category=floor" },
    { name: "AC Split Duct", href: "/shop?category=duct" },
    { name: "AC Inverter", href: "/shop?category=inverter" },
    { name: "AC Portable", href: "/shop?category=portable" },
  ];

  const quickLinks = [
    { name: "Tentang Kami", href: "/about" },
    { name: "Layanan Kami", href: "/services" },
    { name: "Proyek / Portofolio", href: "/portofolio" },
    { name: "Katalog Produk", href: "/shop" },
    { name: "Hubungi Kami", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const contactList = [
    {
      Icon: MapPin,
      title: "Lokasi",
      value: "Jl. Margonda Raya No. 123, Depok, Jawa Barat",
    },
    { Icon: Phone, title: "No. Telepon", value: "+62 123-4567-8900" },
    { Icon: Mail, title: "Email", value: "halo@acsejukabadi.com" },
  ];

  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto py-8">
        <div className="space-y-16">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
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

            <FooterList title="Top Brand" list={topBrandList} />
            <FooterList title="Category" list={categoryList} />
            <FooterList title="Informasi" list={quickLinks} />
          </div>

          <div className="flex gap-8">
            <div className="space-y-4 flex-1">
              <h1 className="font-semibold text-xs tracking-widest uppercase">
                Lokasi kami
              </h1>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.6720448135!2d106.817176!3d-6.349912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed007042b1c1%3A0xad5a9a5e28f1f5a!2sPT.Alfa%20Cakrawala%20Sejuk%20Abadi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full rounded-lg h-56"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="space-y-4">
              <h1 className="font-semibold text-xs tracking-widest uppercase">
                Hubungi kami
              </h1>

              <div className="space-y-2">
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

            <div className="text-xs flex justify-between font-medium">
              <p>© 2026 PT. Alfa Cakrawala Sejuk Abadi. All rights reserved.</p>

              <div className="flex gap-8">
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
