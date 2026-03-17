"use client";

export default function Page() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data disimpan!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-[#121212] p-5">

      <div className="w-full max-w-md bg-white dark:bg-[#1e1e1e] border rounded-xl p-8 shadow-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Informasi Pribadi
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Perbarui data akun Anda
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Budi Santoso"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="budi@email.com"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Nomor Telepon
            </label>
            <input
              type="tel"
              placeholder="0812xxxxxxx"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Password Baru
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Simpan Perubahan
          </button>

        </form>

      </div>

    </div>
  );
}