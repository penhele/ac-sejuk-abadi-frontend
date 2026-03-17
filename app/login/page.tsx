export default function Page() {
  return (
    <div className="login-container">

      {/* KIRI - BRANDING */}
      <div className="login-left">
        <h1>AC Sejuk Abadi</h1>
        <p>Solusi Pendingin Ruangan Terbaik</p>

        <img 
          src="/logo.png"
          alt="logo"
          className="logo-image"
        />
      </div>


      {/* KANAN - LOGIN */}
      <div className="login-right">

        <div className="login-card">

          <h2 className="login-title">Login</h2>

          <p className="login-subtitle">
            Selamat datang di website
          </p>

          <form className="login-form">

            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Masukkan email"
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Masukkan password"
              />
            </div>

            {/* OPTIONS */}
            <div className="form-options">

              <label className="checkbox">
                <input type="checkbox"/>
                <span>I'm not a robot</span>
              </label>

              <a href="#" className="forgot">
                Lupa password?
              </a>

            </div>

            {/* LOGIN BUTTON */}
            <button type="submit" className="login-button">
              Login
            </button>

          </form>


          {/* PEMISAH */}
          <div className="divider">
            <span>atau login dengan</span>
          </div>


          {/* SOCIAL LOGIN */}
          <div className="social-login">

            <button>
              <img src="/google.png" alt="google"/>
            </button>

            <button>
              <img src="/facebook.png" alt="facebook"/>
            </button>

            <button>
              <img src="/instagram.png" alt="instagram"/>
            </button>

          </div>


          {/* REGISTER */}
          <p className="register-text">
            Belum punya akun?
            <a href="#"> Daftar sekarang</a>
          </p>

        </div>

      </div>

    </div>
  )
}