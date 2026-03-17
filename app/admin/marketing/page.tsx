"use client";

import { useState } from "react";

export default function Page() {
  // ================= DISKON =================
  const [discounts, setDiscounts] = useState([
    { title: "Diskon Lebaran", percent: 20 },
    { title: "Promo Tahun Baru", percent: 15 },
  ]);

  const [flashNews, setFlashNews] = useState([
    { title: "Promo hari ini!", description: "Diskon 20% untuk semua AC" },
  ]);

  const [type, setType] = useState<"diskon" | "news">("diskon");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [form, setForm] = useState<any>({});

  // ================= OPEN MODAL =================
  const openAdd = (t: "diskon" | "news") => {
    setType(t);
    setForm({});
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (t: "diskon" | "news", index: number) => {
    setType(t);
    setIsEdit(true);
    setEditIndex(index);

    if (t === "diskon") setForm(discounts[index]);
    else setForm(flashNews[index]);

    setShowModal(true);
  };

  // ================= SAVE =================
  const handleSubmit = () => {
    if (type === "diskon") {
      if (!form.title || !form.percent) return;

      if (isEdit && editIndex !== null) {
        const updated = [...discounts];
        updated[editIndex] = form;
        setDiscounts(updated);
      } else {
        setDiscounts([...discounts, form]);
      }
    } else {
      if (!form.title || !form.description) return;

      if (isEdit && editIndex !== null) {
        const updated = [...flashNews];
        updated[editIndex] = form;
        setFlashNews(updated);
      } else {
        setFlashNews([...flashNews, form]);
      }
    }

    setShowModal(false);
  };

  // ================= DELETE =================
  const handleDelete = (t: "diskon" | "news", index: number) => {
    if (t === "diskon") {
      setDiscounts(discounts.filter((_, i) => i !== index));
    } else {
      setFlashNews(flashNews.filter((_, i) => i !== index));
    }
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Pemasaran
      </h1>

      {/* ================= DISKON ================= */}
      <div className="mb-10">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Diskon</h2>

          <button
            onClick={() => openAdd("diskon")}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            + Tambah Diskon
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          {discounts.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.percent}%
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => openEdit("diskon", i)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete("diskon", i)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FLASH NEWS ================= */}
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Flash News</h2>

          <button
            onClick={() => openAdd("news")}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            + Tambah News
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          {flashNews.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => openEdit("news", i)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete("news", i)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="font-bold mb-4">
              {isEdit ? "Edit" : "Tambah"}{" "}
              {type === "diskon" ? "Diskon" : "Flash News"}
            </h2>

            <input
              type="text"
              placeholder="Judul"
              value={form.title || ""}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            {type === "diskon" ? (
              <input
                type="number"
                placeholder="Persen Diskon"
                value={form.percent || ""}
                onChange={(e) =>
                  setForm({ ...form, percent: e.target.value })
                }
                className="w-full mb-3 px-3 py-2 border rounded"
              />
            ) : (
              <textarea
                placeholder="Deskripsi"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full mb-3 px-3 py-2 border rounded"
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