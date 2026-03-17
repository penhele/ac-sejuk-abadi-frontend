export default function Page() {
  const wishlist = [
    { name: 'AC Panasonic 1 PK', desc: 'Inverter hemat energi', price: 'Rp 4.500.000', icon: '❄️' },
    { name: 'AC Daikin 1.5 PK', desc: 'Pendinginan super cepat', price: 'Rp 5.200.000', icon: '🌬️' }
  ];

  return (
    <div className="p-10 min-h-screen bg-gray-100 dark:bg-[#121212] flex justify-center">

      <section className="w-full max-w-3xl bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border shadow-sm">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Wishlist</h2>

          <button className="text-blue-600 font-semibold hover:underline">
            Lihat Semua
          </button>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4">

          {wishlist.map((item, i) => (

            <div key={i} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">

              <div className="flex gap-4 items-center">

                <div className="w-15 h-15 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.desc}
                  </p>
                  <p className="text-blue-600 font-semibold">
                    {item.price}
                  </p>
                </div>

              </div>

              <div className="flex gap-2">

                <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
                  + Keranjang
                </button>

                <button className="border border-red-500 text-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-50 dark:hover:bg-red-900/20">
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