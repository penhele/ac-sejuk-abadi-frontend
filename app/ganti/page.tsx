export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ACCOUNT SETTINGS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl">

        <h2 className="text-xl font-bold mb-6 text-slate-800">
          Informasi Pribadi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Nama Lengkap
            </label>
            <input
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
              placeholder="Nama Lengkap"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Email
            </label>
            <input
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
              placeholder="Email"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Nomor Telepon
            </label>
            <input
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
              placeholder="Nomor Telepon"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Ganti Password
            </label>
            <input
              type="password"
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
              placeholder="Password Baru"
            />
          </div>

        </div>

        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-3 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95">
            Simpan Perubahan
          </button>
        </div>

      </section>

    </div>
  )
}