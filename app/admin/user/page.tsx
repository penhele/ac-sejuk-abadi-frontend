"use client";

import { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");

  const users = [
    {
      name: "Agung",
      contact: "agung@email.com",
      orders: 5,
      joined: "2026-01-10",
    },
    {
      name: "Budi",
      contact: "08123456789",
      orders: 2,
      joined: "2026-02-05",
    },
    {
      name: "Siti",
      contact: "siti@email.com",
      orders: 8,
      joined: "2025-12-20",
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Data Pengguna
        </h1>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari pengguna..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 text-left">Nama</th>
              <th className="py-3 text-left">Kontak</th>
              <th className="py-3 text-left">Pesanan</th>
              <th className="py-3 text-left">Tgl Bergabung</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, i) => (
              <tr key={i} className="border-b">

                <td className="py-3 font-medium">
                  {user.name}
                </td>

                <td>{user.contact}</td>

                <td>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                    {user.orders} Pesanan
                  </span>
                </td>

                <td>{user.joined}</td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}