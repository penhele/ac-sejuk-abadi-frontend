import PortofolioCard from "../cards/portofolio-card";

const projects = [
  {
    id: "1",
    title: "Luxury Apartemen Menteng",
    category: "Apartemen",
    image: "/images/portofolio/apartemen.png",
    description:
      "Pemasangan sistem AC Multi-S untuk efisiensi ruang dan energi di apartemen mewah kawasan Menteng.",
  },
  {
    id: "2",
    title: "Office Tower Sudirman",
    category: "Kantor",
    image: "/images/portofolio/office.png",
    description:
      "Solusi pendinginan VRV terintegrasi untuk 5 lantai perkantoran dengan kontrol cerdas.",
  },
  {
    id: "3",
    title: "Ruko Premium Pantai Indah Kapuk",
    category: "Ruko",
    image: "/images/portofolio/hero-bg.png",
    description:
      "Instalasi AC Cassette yang estetik dan bertenaga untuk showroom otomotif di kawasan PIK.",
  },
  {
    id: "4",
    title: "Penthouse Residence",
    category: "Apartemen",
    image: "/images/portofolio/apartemen.png",
    description:
      "Sistem pendingin udara tersembunyi (ducted) untuk menjaga estetika interior minimalis.",
  },
];

export default function PortofolioList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((item) => (
        <PortofolioCard key={item.id} portofolio={item} />
      ))}
    </div>
  );
}
