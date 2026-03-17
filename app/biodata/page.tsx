"use client";

export default function Page() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data disimpan!");
  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">
          <h2>Informasi Pribadi</h2>
          <p>Perbarui data akun Anda</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="profile-form">

          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Budi Santoso"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="budi@email.com"
            />
          </div>

          <div className="form-group">
            <label>Nomor Telepon</label>
            <input
              type="tel"
              placeholder="0812xxxxxxx"
            />
          </div>

          <div className="form-group">
            <label>Password Baru</label>
            <input
              type="password"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="save-button">
            Simpan Perubahan
          </button>

        </form>

      </div>

    </div>
  );
}