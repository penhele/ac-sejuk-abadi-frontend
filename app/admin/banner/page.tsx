"use client";

import { useState } from "react";

export default function Page() {
  const [banners, setBanners] = useState([
    {
      title: "Promo AC Besar-besaran",
      image: "https://via.placeholder.com/300x150",
    },
  ]);

  const [form, setForm] = useState<any>({});
  const [preview, setPreview] = useState<string | null>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // OPEN TAMBAH
  const handleAdd = () => {
    setForm({});
    setPreview(null);
    setIsEdit(false);
    setShowModal(true);
  };

  // OPEN EDIT
  const handleEdit = (index: number) => {
    setForm(banners[index]);
    setPreview(banners[index].image);
    setEditIndex(index);
    setIsEdit(true);
    setShowModal(true);
  };

  // HANDLE IMAGE
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setForm({ ...form, image: url });
    }
  };

  // SUBMIT
  const handleSubmit = () => {
    if (!form.title || !form.image) return;

    if (isEdit && editIndex !== null) {
      const updated = [...banners];
      updated[editIndex] = form;
      setBanners(updated);
    } else {
      setBanners([...banners, form]);
    }

    setShowModal(false);
  };

  // DELETE
  const handleDelete = (index: number) => {
    const updated = banners.filter((_, i) => i !== index);
    setBanners(updated);
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Banner Iklan
        </h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Tambah Banner
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {banners.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold">{item.title}</h3>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(i)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(i)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="font-bold mb-4">
              {isEdit ? "Edit Banner" : "Tambah Banner"}
            </h2>

            <input
              type="text"
              placeholder="Judul Banner"
              value={form.title || ""}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              type="file"
              onChange={handleImage}
              className="w-full mb-3"
            />

            {/* PREVIEW */}
            {preview && (
              <img
                src={preview}
                className="w-full h-32 object-cover mb-3 rounded"
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Batal
              </button>

              <button
                onClick={handleSubmit}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Simpan
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}