"use client";

import { useState } from "react";

export default function Page() {
  const [about, setAbout] = useState({
    title: "Tentang Kami",
    description:
      "Kami adalah perusahaan yang bergerak di bidang penjualan dan layanan AC terpercaya dengan kualitas terbaik.",
    vision: "Menjadi penyedia layanan terbaik di Indonesia.",
    mission:
      "Memberikan pelayanan terbaik, produk berkualitas, dan kepuasan pelanggan.",
  });

  const [form, setForm] = useState(about);
  const [isEditing, setIsEditing] = useState(false);

  // HANDLE EDIT
  const handleEdit = () => {
    setIsEditing(true);
  };

  // HANDLE SAVE
  const handleSave = () => {
    setAbout(form);
    setIsEditing(false);
  };

  // HANDLE CHANGE
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          About Us
        </h1>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-yellow-400 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Simpan
          </button>
        )}
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <div>
          <label className="block text-sm mb-1">Judul</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Deskripsi</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Visi</label>
          <textarea
            name="vision"
            value={form.vision}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Misi</label>
          <textarea
            name="mission"
            value={form.mission}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

      </div>

      {/* PREVIEW */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">{about.title}</h2>
        <p className="text-gray-600 mb-4">{about.description}</p>

        <h3 className="font-semibold">Visi</h3>
        <p className="text-gray-600 mb-3">{about.vision}</p>

        <h3 className="font-semibold">Misi</h3>
        <p className="text-gray-600">{about.mission}</p>
      </div>

    </div>
  );
}