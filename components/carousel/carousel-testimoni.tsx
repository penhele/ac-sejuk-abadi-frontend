import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function CarouselTestimoni() {
  const testimoniList = [
    {
      review:
        "Pelayanannya sangat cepat dan responsif. Saya sangat terbantu dengan solusi yang diberikan, benar-benar profesional!",
      name: "Stephen",
    },
    {
      review:
        "Awalnya ragu untuk mencoba, tapi setelah melihat hasilnya sendiri, saya sangat puas. Kualitas produknya melampaui ekspektasi saya dan tim. Sangat merekomendasikan layanan ini untuk kebutuhan bisnis jangka panjang Anda.",
      name: "Fernando",
    },
    {
      review: "Terima kasih banyak! Hasilnya luar biasa keren.",
      name: "Ezra",
    },
    {
      review:
        "Prosesnya sangat simpel dan tidak berbelit-belit. Fitur-fitur yang disediakan sangat user-friendly bahkan untuk orang awam seperti saya. Dashboard-nya bersih dan navigasinya sangat intuitif.",
      name: "Regina",
    },
    {
      review:
        "Harga yang ditawarkan sangat kompetitif dibandingkan kompetitor lain di industri yang sama. Meskipun harganya terjangkau, kualitas pelayanannya tetap nomor satu. Tidak menyesal sudah berlangganan di sini selama setahun terakhir.",
      name: "Ivana",
    },
    {
      review: "Recommended banget buat kalian yang cari efisiensi waktu!",
      name: "Meli",
    },
    {
      review:
        "Dukungan tim teknisnya luar biasa ramah. Setiap ada kendala selalu dibantu sampai tuntas tanpa menunggu lama. Ini adalah pengalaman servis terbaik yang pernah saya rasakan di platform digital.",
      name: "Septya",
    },
    {
      review:
        "Suka sekali dengan desainnya yang modern dan clean. Sangat membantu meningkatkan konversi penjualan di toko online saya secara signifikan dalam waktu singkat.",
      name: "Gilang",
    },
    {
      review: "Mantap, sukses terus ya!",
      name: "Ahmad",
    },
  ];

  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
        duration: 100,
      }}
      plugins={[
        Autoplay({
          delay: 3500,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent className="py-8">
        {testimoniList.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-auto w-lg hover:cursor-pointer"
          >
            <div className="border rounded-lg shadow-lg p-4 space-y-4 transition hover:shadow-xl hover:scale-102">
              <p className="text-sm text-gray-600 line-clamp-5 h-28">
                {item.review}
              </p>

              <div className="flex flex-col">
                <span className="font-bold">{item.name}</span>
                <span className="text-xs text-gray-400">5 April 2026</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
