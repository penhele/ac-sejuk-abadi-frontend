"use client";

import { useState } from "react";

export default function Page() {
  const [portfolios, setPortfolios] = useState([
    {
      title: "Judul Artikel 1",
      description: "deskripsi singkat artikel untuk menarik pembaca",
    },
    {
      title: "Judul Artikel 2",
      description: "deskripsi singkat artikel untuk menarik pembaca",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // OPEN MODAL TAMBAH
  const handleAdd = () => {
    setForm({ title: "", description: "" });
    setIsEdit(false);
    setShowModal(true);
  };

  // OPEN MODAL EDIT
  const handleEdit = (index: number) => {
    setForm(portfolios[index]);
    setEditIndex(index);
    setIsEdit(true);
    setShowModal(true);
  };

  // SIMPAN DATA
  const handleSubmit = () => {
    if (!form.title || !form.description) return;

    if (isEdit && editIndex !== null) {
      const updated = [...portfolios];
      updated[editIndex] = form;
      setPortfolios(updated);
    } else {
      setPortfolios([...portfolios, form]);
    }

    setShowModal(false);
  };

  // HAPUS
  const handleDelete = (index: number) => {
    const updated = portfolios.filter((_, i) => i !== index);
    setPortfolios(updated);
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Portofolio
        </h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Tambah Portofolio
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {portfolios.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h3 className="font-bold text-lg">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {item.description}
            </p>

            <div className="mt-4 flex gap-2">
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
        ))}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-lg font-bold mb-4">
              {isEdit ? "Edit Portofolio" : "Tambah Portofolio"}
            </h2>

            <input
              type="text"
              placeholder="Judul"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <textarea
              placeholder="Deskripsi"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
            />

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