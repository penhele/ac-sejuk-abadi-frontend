import ProjectGrid from "@/components/grid/project-grid";
import { HeaderSection } from "@/components/util/header";
import { ROUTES } from "@/contants/routes";
import { getCompany } from "@/services/company.service";
import { getStaff } from "@/services/staff.service";
import { ImageOff, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default async function AboutUsPage() {
  const staff = await getStaff();
  const company = await getCompany();

  const contactList = [
    { Icon: Phone, label: "Phone", value: company.phone },
    { Icon: Mail, label: "Email", value: company.email },
    { Icon: MapPin, label: "Location", value: company.location },
  ];

  return (
    <main className="">
      <div className="space-y-between-section">
        <div className="">
          <div className="h-24 relative">
            <Image
              src={"/logo.png"}
              alt=""
              fill
              className="w-auto object-contain object-left"
            />
          </div>

          <p className="text-sm text-gray-800">{company.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {contactList.map((item, index) => (
            <div className="flex flex-col items-center gap-1 border shadow-xs p-4 rounded-lg transition hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer">
              <item.Icon size={32} />
              <span className="text-xl font-bold">{item.label}</span>
              <span className="text-sm text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.6720448135!2d106.817176!3d-6.349912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed007042b1c1%3A0xad5a9a5e28f1f5a!2sPT.Alfa%20Cakrawala%20Sejuk%20Abadi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
          className="w-full rounded-lg h-80"
          allowFullScreen
          loading="lazy"
        />

        <div className="space-y-8">
          <div className="">
            <HeaderSection title="Tim Kami" />
            <p className="text-sm text-gray-800">
              Berdiri sejak 1994 dan memiliki pengalaman lebih dari 30 tahun di
              bidang pendinginan ruangan. Dengan dukungan lebih dari 100 tenaga
              profesional, kami siap membantu semua kebutuhan pendinginan
              ruangan Anda dengan layanan cepat, tepat, dan terpercaya.
            </p>
          </div>

          <div className="flex space-x-8 justify-center">
            {staff.map((staf) => (
              <div key={staf.id} className="rounded-xl bg-muted shadow-lg w-64">
                <div className="relative aspect-2/3 overflow-hidden rounded-t-lg">
                  {staf.image_url ? (
                    <Image
                      src={staf.image_url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col justify-center h-full items-center space-y-2">
                      <ImageOff size={24} className="text-gray-400" />
                      <span className="font-medium">No Image</span>
                    </div>
                  )}
                </div>

                <div className="bg-white h-20 flex flex-col text-center justify-center rounded-b-lg">
                  <span className="text-xl font-bold">{staf.name}</span>
                  <span className="font-light">{staf.role}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="aspect-21/9 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={"/pemerintah.png"}
              alt=" "
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="">
          <HeaderSection title="Portofolio" href={ROUTES.PORTOFOLIO} />
          <ProjectGrid />
        </div>
      </div>
    </main>
  );
}
