export default function Page() {
  const wishlist = [
    { name: 'AC Panasonic 1 PK', desc: 'Inverter hemat energi', price: 'Rp 4.500.000', icon: '❄️' },
    { name: 'AC Daikin 1.5 PK', desc: 'Pendinginan super cepat', price: 'Rp 5.200.000', icon: '🌬️' }
  ];

  return (
    <div className="wishlist-page">

      <section className="wishlist-card">

        <div className="wishlist-header">
          <h2>Wishlist</h2>

          <button className="see-all">
            Lihat Semua
          </button>
        </div>

        <div className="wishlist-list">

          {wishlist.map((item, i) => (

            <div key={i} className="wishlist-item">

              <div className="wishlist-info">

                <div className="wishlist-icon">
                  {item.icon}
                </div>

                <div>
                  <h3>{item.name}</h3>
                  <p className="desc">{item.desc}</p>
                  <p className="price">{item.price}</p>
                </div>

              </div>


              <div className="wishlist-actions">

                <button className="add-cart">
                  + Keranjang
                </button>

                <button className="delete">
                  Hapus
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  )
}