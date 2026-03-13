export default function Page() {
  return (
    <div className="flex min-h-screen">

      {/* KIRI - BRANDING */}
      <div className="flex flex-col items-center justify-center bg-blue-500 w-1/2 text-white">
        <h1 className="text-5xl font-bold mb-4">AC Sejuk Abadi</h1>
        <p className="text-lg">Solusi Pendingin Ruangan Terbaik</p>

        <img 
          src="/logo.png"
          alt="logo"
          className="w-40 mt-6"
        />
      </div>


      {/* KANAN - LOGIN */}
      <div className="flex items-center justify-center w-1/2 bg-gray-100">

        <div className="bg-white p-10 rounded-xl shadow-lg w-96">

          <h2 className="text-3xl font-bold text-center text-blue-500 mb-2">
            Login
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Selamat datang di website
          </p>

          <form className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* CAPTCHA */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4"/>
                <span>I'm not a robot</span>
              </label>

              <a href="#" className="text-blue-500 hover:underline">
                Lupa password?
              </a>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>

          </form>

          {/* PEMISAH */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t"></div>
            <span className="mx-3 text-gray-500 text-sm">atau login dengan</span>
            <div className="flex-grow border-t"></div>
          </div>


          {/* SOCIAL LOGIN */}
          <div className="flex justify-center gap-4">

            <button className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-gray-100">
              <img src="/google.png" alt="google" className="w-6"/>
            </button>

            <button className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-gray-100">
              <img src="/facebook.png" alt="facebook" className="w-6"/>
            </button>

            <button className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-gray-100">
              <img src="/instagram.png" alt="instagram" className="w-6"/>
            </button>

          </div>


          {/* REGISTER */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Belum punya akun? 
            <a href="#" className="text-blue-500 font-semibold ml-1 hover:underline">
              Daftar sekarang
            </a>
          </p>

        </div>

      </div>

    </div>
  )
}