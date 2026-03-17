import Link from "next/link";

export default function Page() {

  const status = [
    { icon: "📦", title: "Sedang Dikemas", total: 2 },
    { icon: "🚚", title: "Dikirim", total: 1 },
    { icon: "✅", title: "Selesai", total: 12 }
  ];

  const orders = [
    { name: "AC Panasonic 1 PK", desc: "Inverter hemat energi", price: "Rp 4.500.000", status: "Dikirim", icon: "❄️" },
    { name: "AC Daikin 1.5 PK", desc: "Pendinginan super cepat", price: "Rp 5.200.000", status: "Selesai", icon: "🌬️" }
  ];

  return (
    <div className="p-10 min-h-screen bg-gray-100 dark:bg-[#121212]">

      <div className="flex gap-8 max-w-6xl mx-auto">

        {/* SIDEBAR */}
        <aside className="w-[250px] bg-white dark:bg-[#1e1e1e] border rounded-xl p-5">

          <h2 className="text-lg font-semibold mb-5">Menu Akun</h2>

          <nav className="flex flex-col gap-2">

            <Link href="/biodata">
              <button className="text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 w-full">
                ⚙️ Biodata
              </button>
            </Link>

            <Link href="/wishlist">
              <button className="text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 w-full">
                ❤️ Wishlist
              </button>
            </Link>

            <hr className="my-2 border-gray-300 dark:border-gray-700"/>

            <Link href="/login">
              <button className="text-left p-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full">
                🚪 Keluar
              </button>
            </Link>

          </nav>

        </aside>


        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-8">

          {/* STATUS PESANAN */}
          <section className="flex gap-5">

            {status.map((item, i) => (

              <div key={i} className="flex-1 bg-white dark:bg-[#1e1e1e] border rounded-xl p-5 text-center shadow-sm">

                <div className="text-3xl mb-2">
                  {item.icon}
                </div>

                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h3 className="text-2xl font-bold text-blue-600">
                  {item.total}
                </h3>

              </div>

            ))}

          </section>


          {/* RIWAYAT PESANAN */}
          <section className="bg-white dark:bg-[#1e1e1e] border rounded-xl p-6">

            <div className="mb-5">
              <h2 className="text-lg font-semibold">
                Riwayat Pemesanan
              </h2>
              <p className="text-sm text-gray-500">
                Daftar transaksi terakhir Anda
              </p>
            </div>

            <div className="flex flex-col gap-4">

              {orders.map((order, i) => (

                <div key={i} className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition">

                  <div className="flex gap-4 items-center">

                    <div className="w-[60px] h-[60px] bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                      {order.icon}
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {order.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order.desc}
                      </p>
                      <p className="text-blue-600 font-semibold">
                        {order.price}
                      </p>
                    </div>

                  </div>


                  <div className="flex flex-col items-end gap-2">

                    <span className={`text-xs px-3 py-1 rounded-full ${
                      order.status === "Dikirim"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {order.status}
                    </span>

                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
                      Detail
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>

        </main>

      </div>

    </div>
  )
}