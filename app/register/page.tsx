export default function Page() {
  return (
    <div className="flex min-h-screen">

      {/* KIRI - LOGO / BRANDING */}
      <div className="flex flex-col items-center justify-center bg-blue-300 w-1/2 text-white">
        <h1 className="text-5xl font-bold mb-4">AC Sejuk Abadi</h1>
        <p className="text-lg">Solusi Pendingin Ruangan Terbaik</p>

        {/* contoh logo */}
        <img 
          src="/logo.png"
          alt="logo"
          className="w-40 mt-6"
        />
      </div>


      {/* KANAN - LOGIN FORM */}
      <div className="flex items-center justify-center w-1/2 bg-gray-100">

        <div className="bg-white p-10 rounded-xl shadow-lg w-96">

          <h2 className="text-3xl font-bold text-center text-blue-500 mb-2">
            Register
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Selamat datang di website
          </p>

          <form className="space-y-4">

            <div>
              <label className="block text-gray-700 mb-1">
                Nama Depan
              </label>
              <input
                type="text"
                placeholder="Masukkan nama depan"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Nama Belakang
              </label>
              <input
                type="text"
                placeholder="Masukkan nama belakang"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Alamat
              </label>
              <input
                type="text"
                placeholder="Masukkan alamat"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
             <div className="flex items-center justify-between text-sm">

              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4"/>
                <span>I'm not a robot</span>
              </label>
              </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}