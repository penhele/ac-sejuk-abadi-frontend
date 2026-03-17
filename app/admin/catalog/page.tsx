"use client";

import { useState } from "react";

export default function Page() {
  const [category, setCategory] = useState("Semua");

  const products = [
    { name: "AC Panasonic 1 PK", category: "AC", price: "Rp 4.500.000" },
    { name: "AC Daikin 1.5 PK", category: "AC", price: "Rp 5.200.000" },
    { name: "Kulkas LG 2 Pintu", category: "Elektronik", price: "Rp 3.800.000" },
  ];

  const categories = ["Semua", "AC", "Elektronik"];

  const filteredProducts =
    category === "Semua"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Katalog Produk
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          + Tambah Produk
        </button>
      </div>

      {/* FILTER */}
      <div className="mb-4 flex gap-2">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded-md text-sm ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TABLE LIST PRODUK */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 text-left">Nama Produk</th>
              <th className="py-3 text-left">Kategori</th>
              <th className="py-3 text-left">Harga</th>
              <th className="py-3 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((product, i) => (
              <tr key={i} className="border-b">

                <td className="py-3 font-medium">
                  {product.name}
                </td>

                <td>{product.category}</td>

                <td className="font-semibold">
                  {product.price}
                </td>

                <td className="text-right space-x-2">

                  <button className="px-3 py-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500">
                    Edit
                  </button>

                  <button className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                    Hapus
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}