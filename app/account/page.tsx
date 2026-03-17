import Link from "next/link";

export default function Page() {

  const status = [
    { icon: "📦", title: "Sedang Dikemas", total: 2 },
    { icon: "🚚", title: "Dikirim", total: 1 },
    { icon: "✅", title: "Selesai", total: 12 }
  ];

  const orders = [
    { name: "AC Panasonic 1 PK", desc: "Inverter hemat energi", price: "Rp 4.500.000", status: "Dikirim", icon: "❄️" },
    { name: "AC Daikin 1.5 PK", desc: "Pendinginan super cepat", price: "Rp 5.200.000", status: "Selesai", icon: "🌬️" }
  ];

  return (
    <div className="account-page">

      <div className="account-container">

        {/* SIDEBAR */}
       <aside className="account-sidebar">

  <h2 className="sidebar-title">Menu Akun</h2>

  <nav className="sidebar-menu">

    <Link href="/biodata">
      <button className="menu-item">
        ⚙️ Biodata
      </button>
    </Link>

    <Link href="/wishlist">
      <button className="menu-item">
        ❤️ Wishlist
      </button>
    </Link>

    <hr />

    <Link href="/login">
      <button className="menu-item logout">
        🚪 Keluar
      </button>
    </Link>

  </nav>

</aside>


        {/* MAIN CONTENT */}
        <main className="account-main">

          {/* STATUS PESANAN */}
          <section className="status-cards">

            {status.map((item, i) => (

              <div key={i} className="status-card">

                <div className="status-icon">
                  {item.icon}
                </div>

                <p className="status-title">
                  {item.title}
                </p>

                <h3 className="status-number">
                  {item.total}
                </h3>

              </div>

            ))}

          </section>


          {/* RIWAYAT PESANAN */}
          <section className="order-history">

            <div className="history-header">
              <h2>Riwayat Pemesanan</h2>
              <p>Daftar transaksi terakhir Anda</p>
            </div>

            <div className="order-list">

              {orders.map((order, i) => (

                <div key={i} className="order-item">

                  <div className="order-info">

                    <div className="order-icon">
                      {order.icon}
                    </div>

                    <div>
                      <h3>{order.name}</h3>
                      <p className="desc">{order.desc}</p>
                      <p className="price">{order.price}</p>
                    </div>

                  </div>


                  <div className="order-actions">

                    <span className={`status-label ${order.status === "Dikirim" ? "shipping" : "done"}`}>
                      {order.status}
                    </span>

                    <button className="detail-btn">
                      Detail
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>

        </main>

      </div>

    </div>
  )
}