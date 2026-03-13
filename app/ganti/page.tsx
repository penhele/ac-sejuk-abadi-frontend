"use client";

export default function Page() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data disimpan!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">

<div className="w-full max-w-xs bg-white p-10 rounded-xl shadow">
            {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Informasi Pribadi
          </h2>
          <p className="text-sm text-slate-500">
            Perbarui data akun Anda
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium text-slate-600">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Budi Santoso"
              className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              placeholder="budi@email.com"
              className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Nomor Telepon
            </label>
            <input
              type="tel"
              placeholder="0812xxxxxxx"
              className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Password Baru
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Simpan Perubahan
          </button>

        </form>

      </div>

    </div>
  );
}