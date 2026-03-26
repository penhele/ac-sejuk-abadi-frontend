import { Mail, MapPin, Phone, Send, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
      value: "Jl. Margonda Raya No. 123, Depok, Jawa Barat",
    },
    { Icon: Phone, value: "+62 123-4567-8900" },
    { Icon: Mail, value: "halo@acsejukabadi.com" },
  ];

  return (
    <footer className="bg-slate-900 pt-20 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Middle Section: Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Identity */}
          <div className="space-y-8">
            <div className="relative w-48 h-12">
              {/* Replace with actual logo if available, current logo.png is white? */}
              <Image src="/logo.png" alt="AC Sejuk Abadi" fill className="object-contain brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Penyedia solusi pendingin udara (AC) terbaik dengan pengalaman lebih dari 10 tahun. Kami berkomitmen memberikan kenyamanan udara untuk setiap ruangan Anda.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Catalog & Brands */}
          <div className="grid grid-cols-2 gap-8 md:col-span-1 lg:col-span-2">
            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">Top Brand</h4>
              <ul className="space-y-4">
                {topBrandList.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm hover:text-primary transition-colors hover:underline">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">Category</h4>
              <ul className="space-y-4">
                {categoryList.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm hover:text-primary transition-colors hover:underline">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links & Information */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Informasi</h4>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm hover:text-primary transition-colors hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Maps & Contact */}
        <div className="py-12 border-t border-slate-800 flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Lokasi Kami</h4>
            <div className="overflow-hidden rounded-3xl border border-slate-800 grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.6720448135!2d106.817176!3d-6.349912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed007042b1c1%3A0xad5a9a5e28f1f5a!2sPT.Alfa%20Cakrawala%20Sejuk%20Abadi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full h-48 sm:h-64"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="w-full lg:w-80 space-y-8">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Hubungi Kami</h4>
            <div className="space-y-6">
              {contactList.map((contact, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center text-primary">
                    <contact.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-tight">
                      {contact.Icon === MapPin ? "Alamat" : contact.Icon === Phone ? "Telepon" : "Email"}
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {contact.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Copyright */}
        <div className="py-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium text-slate-500">
          <p>© 2026 PT. Alfa Cakrawala Sejuk Abadi. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
