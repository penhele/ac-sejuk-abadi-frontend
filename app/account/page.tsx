export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 p-6">

        {/* SIDEBAR */}
        <aside className="md:w-72 w-full shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">

            <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-blue-500 rounded-full"></span>
              Menu Akun
            </h2>

            <div className="flex flex-col gap-2">

              <button className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-600 font-semibold transition">
                ⚙️ Account Settings
              </button>

              <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition">
                ❤️ Wishlist
              </button>

              <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition">
                📦 Riwayat Pesanan
              </button>

              <hr className="my-4 border-slate-100" />

              <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500 transition">
                🚪 Keluar
              </button>

            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 space-y-8">

          {/* STATUS PESANAN */}
          {/* STATUS PESANAN */}
<section className="flex justify-between items-center mb-6 gap-4">

  {[
    { icon: "📦", title: "Sedang Dikemas", total: 2 },
    { icon: "🚚", title: "Dikirim", total: 1 },
    { icon: "✅", title: "Selesai", total: 12 }
  ].map((item, i) => (

    <div
      key={i}
      className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center hover:shadow-md transition"
    >

      <div className="text-3xl mb-2">{item.icon}</div>

      <p className="text-sm text-slate-400 uppercase tracking-wide">
        {item.title}
      </p>

      <h3 className="text-3xl font-black text-slate-800">
        {item.total}
      </h3>

    </div>

  ))}

</section>

          {/* RIWAYAT PESANAN */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Riwayat Pemesanan
              </h2>

              <button className="text-blue-500 text-sm font-bold hover:underline">
                Lihat Semua
              </button>
            </div>

            <div className="space-y-4">

              {[
                {
                  name: "AC Panasonic 1 PK",
                  desc: "Inverter hemat energi",
                  price: "Rp 4.500.000",
                  status: "Dikirim",
                  icon: "❄️"
                },
                {
                  name: "AC Daikin 1.5 PK",
                  desc: "Pendinginan super cepat",
                  price: "Rp 5.200.000",
                  status: "Selesai",
                  icon: "🌬️"
                }
              ].map((order, i) => (

                <div key={i}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition">

                  <div className="flex gap-4">

                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                      {order.icon}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {order.name}
                      </h3>

                      <p className="text-sm text-slate-400">
                        {order.desc}
                      </p>

                      <p className="text-blue-600 font-bold mt-1">
                        {order.price}
                      </p>
                    </div>

                  </div>

                  <div className="mt-4 sm:mt-0 flex flex-col items-end gap-3">

                    <span
                      className={`px-3 py-1 text-xs rounded-full font-bold ${
                        order.status === "Dikirim"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {order.status}
                    </span>

                    <button className="px-5 py-2 rounded-xl text-sm font-bold border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition">
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