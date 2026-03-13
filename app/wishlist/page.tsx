export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans p-6">

      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Wishlist</h2>
          <button className="text-blue-500 text-sm font-bold hover:underline">
            Lihat Semua
          </button>
        </div>

        <div className="space-y-4">

          {[
            { name: 'AC Panasonic 1 PK', desc: 'Inverter hemat energi', price: 'Rp 4.500.000', icon: '❄️' },
            { name: 'AC Daikin 1.5 PK', desc: 'Pendinginan super cepat', price: 'Rp 5.200.000', icon: '🌬️' }
          ].map((item, i) => (

            <div
              key={i}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-colors"
            >

              <div className="flex gap-4">

                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                  <p className="text-blue-600 font-black mt-1">{item.price}</p>
                </div>

              </div>

              <div className="mt-4 sm:mt-0 flex gap-3">

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all">
                  + Keranjang
                </button>

                <button className="border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-bold transition-all">
                  Hapus
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  )
}