"use client";

import Link from "next/link";

export default function ForgotPassword() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Link reset password telah dikirim (simulasi)");
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-[#121212] p-5">

      <div className="w-full max-w-sm bg-white dark:bg-[#1e1e1e] p-10 rounded-xl shadow-md">

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Lupa Password
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Masukkan email untuk reset password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="email@gmail.com"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Kirim Link Reset
          </button>

        </form>

        <p className="mt-5 text-sm text-center text-gray-500 dark:text-gray-400">
          Ingat password?{" "}
          <Link href="/login" className="text-blue-600 hover:underline ml-1">
            Kembali ke Login
          </Link>
        </p>

      </div>

    </div>

  );
}