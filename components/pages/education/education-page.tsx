import React from "react";

// Mendefinisikan tipe data untuk Tipe AC
interface ACType {
  id: string;
  name: string;
  image: string;
  description: string;
  idealFor: string;
  pros: string[];
  cons: string[];
}

export default function EducationPage() {
  // Data edukasi tipe-tipe AC
  const acTypes: ACType[] = [
    {
      id: "split-standard",
      name: "AC Split (Standard)",
      image:
        "https://placehold.co/400x250/e2e8f0/475569?text=AC+Split+Standard",
      description:
        "Tipe AC yang paling umum digunakan di rumah tangga. Terdiri dari dua unit: indoor (di dalam ruangan) dan outdoor (di luar ruangan).",
      idealFor: "Kamar tidur, ruang tamu, dan ruang keluarga.",
      pros: [
        "Harga beli relatif lebih murah",
        "Pemasangan dan perawatan mudah",
        "Banyak pilihan merek dan kapasitas",
      ],
      cons: [
        "Konsumsi listrik lebih tinggi saat tarikan awal",
        "Suhu ruangan bisa sedikit fluktuatif",
      ],
    },
    {
      id: "split-inverter",
      name: "AC Split (Inverter)",
      image:
        "https://placehold.co/400x250/e2e8f0/475569?text=AC+Split+Inverter",
      description:
        "Secara fisik mirip dengan AC Split biasa, namun menggunakan teknologi kompresor yang dapat menyesuaikan putarannya secara otomatis untuk menghemat energi.",
      idealFor:
        "Ruangan yang digunakan dalam jangka waktu lama (lebih dari 6 jam/hari) seperti kamar tidur utama.",
      pros: [
        "Sangat hemat listrik untuk penggunaan jangka panjang",
        "Suhu ruangan jauh lebih stabil",
        "Suara mesin lebih halus",
      ],
      cons: [
        "Harga beli awal lebih mahal",
        "Biaya perbaikan/sparepart (seperti PCB) cenderung lebih mahal",
      ],
    },
    {
      id: "cassette",
      name: "AC Cassette",
      image: "https://placehold.co/400x250/e2e8f0/475569?text=AC+Cassette",
      description:
        "AC yang unit indoor-nya dipasang menempel atau tertanam di plafon langit-langit ruangan. Hembusan angin biasanya tersebar ke 4 arah.",
      idealFor:
        "Kantor, restoran, minimarket, atau ruang tamu dengan plafon tinggi.",
      pros: [
        "Distribusi udara sangat merata",
        "Estetika ruangan terjaga (menyatu dengan plafon)",
        "Kapasitas pendinginan besar",
      ],
      cons: [
        "Pemasangan lebih rumit dan butuh plafon tinggi",
        "Harga unit dan instalasi cukup mahal",
      ],
    },
    {
      id: "standing",
      name: "AC Floor Standing",
      image:
        "https://placehold.co/400x250/e2e8f0/475569?text=AC+Floor+Standing",
      description:
        "AC berbentuk seperti lemari yang diletakkan di lantai. Sangat kuat dan mudah dipindah-pindahkan asalkan selang pembuangan terhubung.",
      idealFor: "Aula pertemuan, acara hajatan, masjid, atau pabrik.",
      pros: [
        "Proses pendinginan sangat cepat",
        "Tidak perlu merusak dinding untuk instalasi permanen",
        "Kapasitas pendinginan sangat besar",
      ],
      cons: ["Memakan ruang di lantai", "Suara hembusan angin cukup bising"],
    },
    {
      id: "portable",
      name: "AC Portable",
      image: "https://placehold.co/400x250/e2e8f0/475569?text=AC+Portable",
      description:
        "AC berukuran kecil yang unit kompresor dan evaporatornya menyatu dalam satu bodi. Bisa dipindah ke ruangan mana saja.",
      idealFor:
        "Kamar kos, apartemen sewa, atau ruangan kecil yang tidak memungkinkan instalasi AC Split.",
      pros: [
        "Sangat praktis dan mudah dipindahkan",
        "Tidak butuh instalasi teknisi (tinggal colok)",
        "Harga relatif terjangkau",
      ],
      cons: [
        "Harus menyediakan akses jendela untuk pipa pembuangan panas",
        "Agak berisik karena kompresor berada di dalam ruangan",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Panduan Memilih Tipe AC
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Mengetahui tipe AC yang tepat adalah langkah pertama untuk
            mendapatkan kenyamanan maksimal sekaligus efisiensi listrik.
            Pelajari berbagai jenis AC yang tersedia di bawah ini.
          </p>
        </div>

        {/* AC Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {acTypes.map((ac) => (
            <div
              key={ac.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={ac.image}
                  alt={ac.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {ac.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {ac.description}
                </p>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-3">
                    Ideal untuk: {ac.idealFor}
                  </span>
                </div>

                {/* Pros & Cons */}
                <div className="space-y-4 text-sm mt-auto border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-semibold text-green-700 flex items-center gap-1 mb-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Kelebihan
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {ac.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 flex items-center gap-1 mb-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Kekurangan
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {ac.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Masih bingung memilih AC yang tepat?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Selain tipe, ukuran PK AC juga harus disesuaikan dengan luas ruangan
            Anda agar pendinginan optimal dan listrik tetap hemat.
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
            Konsultasi dengan Teknisi Kami
          </button>
        </div>
      </div>
    </div>
  );
}
