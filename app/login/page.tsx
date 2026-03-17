export default function Page() {
  return (
    <div className="flex min-h-screen">

      {/* LEFT */}
      <div className="w-1/2 bg-[#74a1d2] text-white flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl mb-2">AC Sejuk Abadi</h1>
        <p className="text-lg">Solusi Pendingin Ruangan Terbaik</p>

        <img src="/logo.png" className="w-[150px] mt-5" />
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100 dark:bg-[#121212]">

        <div className="bg-white dark:bg-[#1e1e1e] p-10 w-95 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md">

          {/* TITLE */}
          <h2 className="text-2xl text-center text-blue-600">
            Login
          </h2>

          <p className="text-center text-gray-500 dark:text-gray-400 mb-5">
            Selamat Datang
          </p>

          {/* FORM */}
          <form className="flex flex-col gap-4">

            {/* EMAIL */}
            <div className="flex flex-col">
              <label className="mb-1">Email</label>
              <input
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Masukkan email"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col">
              <label className="mb-1">Password</label>
              <input
                type="password"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Masukkan password"
              />
            </div>

            {/* OPTIONS */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                I'm not a robot
              </label>

              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Lupa password?
              </a>
            </div>

            {/* BUTTON */}
            <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Login
            </button>

          </form>

          {/* DIVIDER */}
          <div className="text-center my-5 relative">
            <span className="px-2 text-gray-400 bg-white dark:bg-[#1e1e1e]">
              atau
            </span>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="flex justify-center gap-4">
            <button className="w-11.25 h-11.25 border rounded-md bg-white hover:bg-gray-100 flex justify-center items-center">
              <img src="/google.png" className="w-6" />
            </button>

            <button className="w-11.25 h-11.25 border rounded-md bg-white hover:bg-gray-100 flex justify-center items-center">
              <img src="/facebook.png" className="w-6" />
            </button>

            <button className="w-11.25 h-11.25 border rounded-md bg-white hover:bg-gray-100 flex justify-center items-center">
              <img src="/instagram.png" className="w-6" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Belum punya akun?
              </p>
              <a href="/register" className="text-blue-600 hover:underline">
              Daftar di sini
              </a>
              </div>
          

        </div>
      </div>
    </div>
  );
}