import PortofolioList from "@/components/lists/project-list";
import { HeaderSection } from "@/components/util/header";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function AboutUsPage() {
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

          <p className="text-sm text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A
            dignissimos autem, libero doloremque ut placeat. Corporis error non
            temporibus nobis sint magni dicta qui maxime animi mollitia nemo
            voluptatem dolore vero nesciunt voluptatum excepturi molestias
            ducimus eligendi earum repudiandae, provident rerum a eveniet ullam!
            Adipisci, fugit natus. Praesentium, omnis ratione!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1 border shadow-xs p-4 rounded-lg transition hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer">
            <Phone size={32} />
            <span className="text-xl font-bold">Phone</span>
            <span className="text-sm text-gray-800">+62 1234-567-9000</span>
          </div>
          <div className="flex flex-col items-center gap-1 border shadow-xs p-4 rounded-lg transition hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer">
            <Mail size={32} />
            <span className="text-xl font-bold">Email</span>
            <span className="text-sm text-gray-800">halo@acsejukabadi.com</span>
          </div>
          <div className="flex flex-col items-center gap-1 border shadow-xs p-4 rounded-lg transition hover:-translate-y-1 hover:shadow-lg hover:cursor-pointer">
            <MapPin size={32} />
            <span className="text-xl font-bold">Location</span>
            <span className="text-sm text-gray-800">
              Jl. Margonda Raya No. 123, Depok, Jawa Barat
            </span>
          </div>
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
            <div className="rounded-xl bg-muted shadow-xl  w-64">
              <div className="relative aspect-2/3 overflow-hidden rounded-t-lg">
                <Image
                  src={"/jokowi.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-white h-20 flex flex-col text-center justify-center rounded-b-lg">
                <span className="text-xl font-bold">Fernando Alfa</span>
                <span className="font-light">Direktur</span>
              </div>
            </div>
            <div className="rounded-xl bg-muted shadow-xl  w-64">
              <div className="relative aspect-2/3 overflow-hidden rounded-t-lg">
                <Image
                  src={"/jokowi.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-white h-20 flex flex-col text-center justify-center rounded-b-lg">
                <span className="text-xl font-bold">John Doe</span>
                <span className="font-light">Sekretaris</span>
              </div>
            </div>
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
          <HeaderSection title="Portofolio" href="/portofolio" />
          <PortofolioList />
        </div>
      </div>
    </main>
  );
}
