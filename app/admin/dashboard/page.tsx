"use client";

export default function Page() {
  const stats = [
    { title: "Total Pendapatan", value: "Rp 120.000.000", icon: "💰" },
    { title: "Total Pesanan", value: "320", icon: "📦" },
    { title: "Sedang Mengunjungi", value: "45", icon: "👥" },
    { title: "Total Penjualan", value: "210 Produk", icon: "📊" },
  ];

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Admin
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">
                {item.title}
              </p>
              <h3 className="text-xl font-bold mt-1">
                {item.value}
              </h3>
            </div>

            <div className="text-3xl">
              {item.icon}
            </div>
          </div>
        ))}

      </div>

      {/* WELCOME */}
      <div className="mt-6 bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold text-gray-700 mb-2">
          Selamat Datang 👋
        </h2>
        <p className="text-sm text-gray-500">
          Gunakan menu di sidebar untuk mengelola data (CRUD) seperti produk, pesanan, pengguna, dan lainnya.
        </p>
      </div>

    </div>
  );
}