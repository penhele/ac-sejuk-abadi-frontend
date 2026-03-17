export default function Page() {
  return (
    <div className="flex min-h-screen">

      {/* KIRI - BRANDING */}
      <div className="w-1/2 bg-[#74a1d2] text-white flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold mb-2">AC Sejuk Abadi</h1>
        <p className="text-lg">Solusi Pendingin Ruangan Terbaik</p>

        <img 
          src="/logo.png"
          alt="logo"
          className="w-37.5 mt-5"
        />
      </div>

      {/* KANAN - REGISTER */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100 dark:bg-[#121212]">

        <div className="bg-white dark:bg-[#1e1e1e] p-10 w-95 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md">

          <h2 className="text-2xl text-center text-blue-600 font-semibold">
            Register
          </h2>

          <p className="text-center text-gray-500 dark:text-gray-400 mb-5">
            Selamat Datang, Buat Akun Baru Anda
          </p>

          <form className="flex flex-col gap-4">

            {/* NAMA DEPAN & BELAKANG */}
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label className="mb-1 text-sm">Nama Depan</label>
                <input className="p-2 border rounded-md focus:outline-none focus:border-blue-500" />
              </div>

              <div className="flex flex-col w-1/2">
                <label className="mb-1 text-sm">Nama Belakang</label>
                <input className="p-2 border rounded-md focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm">Email</label>
              <input
                type="email"
                placeholder="Masukkan email"
                className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm">Password</label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* ALAMAT */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm">Alamat</label>
              <input
                type="text"
                placeholder="Masukkan alamat"
                className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* CAPTCHA */}
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox"/>
              <span>I'm not a robot</span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
             <div className="flex justify-center items-center gap-2 text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Sudah punya akun?
              </p>
              <a href="/login" className="text-blue-600 hover:underline">
              Masuk di sini
              </a>
              </div>

          </form>

        </div>

      </div>

    </div>
  )
}