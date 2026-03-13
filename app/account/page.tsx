export default function Page() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white text-slate-700 font-sans">
      
      {/* Background Decorative Circles */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 p-6 lg:p-12">

        {/* SIDEBAR */}
        <aside className="md:w-72 w-full shrink-0">
          <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_10px_40px_rgba(30,64,175,0.05)] border border-white p-6 sticky top-12">

            <div className="flex items-center gap-3 mb-8 px-2">
              <div className="w-2 h-6 bg-blue-500 rounded-full shadow-lg shadow-blue-200"></div>
              <h2 className="font-black text-xl tracking-tight text-slate-800">
                Menu Akun
              </h2>
            </div>

            <nav className="flex flex-col gap-2">
              {[
                { name: "Biodata", icon: "⚙️", active: false },
                { name: "Wishlist", icon: "❤️", active: false }
              ].map((menu, i) => (
                <button
                  key={i}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                    menu.active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1"
                      : "hover:bg-blue-50 text-slate-500 hover:text-blue-600"
                  }`}
                >
                  <span className="text-lg">{menu.icon}</span>
                  <span className="font-bold text-sm">{menu.name}</span>
                </button>
              ))}

              <hr className="my-6 border-slate-100/50" />

              <button className="flex items-center gap-3 p-4 rounded-2xl hover:bg-red-50 text-red-400 hover:text-red-600 transition-all group">
                <span className="group-hover:scale-110 transition">🚪</span>
                <span className="font-bold text-sm">Keluar</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 space-y-10">

          {/* STATUS PESANAN (KARTU ATAS) */}
<section className="flex justify-between items-center mb-6 gap-4">
            {[
              { icon: "📦", title: "Sedang Dikemas", total: 2, color: "text-blue-500" },
              { icon: "🚚", title: "Dikirim", total: 1, color: "text-amber-500" },
              { icon: "✅", title: "Selesai", total: 12, color: "text-emerald-500" }
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-white flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-blue-50 transition-colors">
                  {item.icon}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  {item.title}
                </p>
                <h3 className={`text-4xl font-black ${item.color}`}>
                  {item.total}
                </h3>
              </div>
            ))}
          </section>

          {/* RIWAYAT PESANAN (LIST) */}
          <section className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-white">
            
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  Riwayat Pemesanan
                </h2>
                <p className="text-slate-400 text-sm mt-1">Daftar transaksi terakhir Anda</p>
              </div>

            </div>

            <div className="space-y-6">
              {[
                { name: "AC Panasonic 1 PK", desc: "Inverter hemat energi", price: "Rp 4.500.000", status: "Dikirim", icon: "❄️" },
                { name: "AC Daikin 1.5 PK", desc: "Pendinginan super cepat", price: "Rp 5.200.000", status: "Selesai", icon: "🌬️" }
              ].map((order, i) => (
                <div key={i}
                  className="group flex flex-col sm:flex-row justify-between items-start sm:items-center border border-slate-50 bg-white/50 rounded-3xl p-6 hover:shadow-md hover:bg-white transition-all duration-300">
                  
                  <div className="flex gap-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                      {order.icon}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-black text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {order.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-2">{order.desc}</p>
                      <p className="text-blue-600 font-black text-lg tracking-tight">
                        {order.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-0 flex flex-row sm:flex-col items-center sm:items-end w-full sm:w-auto justify-between gap-4">
                    <span className={`px-4 py-1.5 text-[10px] rounded-full font-black uppercase tracking-widest shadow-sm ${
                        order.status === "Dikirim"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}>
                      {order.status}
                    </span>
                    <button className="px-8 py-3 rounded-2xl text-sm font-bold bg-white border border-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
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