import Image from "next/image";

export default function BrandShowcase() {
  const brands = [
    {
      name: "Daikin",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Daikin_logo.svg",
    },
    {
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    },
    {
      name: "Gree",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Gree_Electric_logo.svg",
    },
    {
      name: "LG",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg",
    },
    {
      name: "Panasonic",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Panasonic_logo.svg",
    },
    {
      name: "Mitsubishi Electric",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mitsubishi_Electric_logo.svg",
    },
  ];

  return (
    <section className="py-20 border-y border-slate-100 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">
          Mitra Terpercaya Kami
        </h2>
        <p className="text-2xl font-bold text-slate-800 tracking-tight">
          Menyediakan Unit AC dari Brand Terkemuka Dunia
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500">
        {brands.map((brand) => (
          <div key={brand.name} className="relative h-8 md:h-10 w-32 filter">
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
