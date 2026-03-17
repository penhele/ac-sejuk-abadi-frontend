"use client";

import { useState } from "react";

export default function Page() {
  const [statusFilter, setStatusFilter] = useState("Semua");

  const orders = [
    {
      date: "2026-03-17",
      customer: "Agung",
      detail: "AC Panasonic 1 PK x1",
      product: "AC",
      status: "Diproses",
    },
    {
      date: "2026-03-16",
      customer: "Budi",
      detail: "Kulkas LG 2 Pintu x1",
      product: "Elektronik",
      status: "Selesai",
    },
    {
      date: "2026-03-15",
      customer: "Siti",
      detail: "AC Daikin 1.5 PK x2",
      product: "AC",
      status: "Pending",
    },
  ];

  const statuses = ["Semua", "Pending", "Diproses", "Selesai"];

  const filteredOrders =
    statusFilter === "Semua"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Pesanan Masuk
        </h1>
      </div>

      {/* FILTER STATUS */}
      <div className="mb-4 flex gap-2">
        {statuses.map((status, i) => (
          <button
            key={i}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-md text-sm ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 text-left">Tanggal</th>
              <th className="py-3 text-left">Pelanggan</th>
              <th className="py-3 text-left">Detail Produk</th>
              <th className="py-3 text-left">Produk</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order, i) => (
              <tr key={i} className="border-b">

                <td className="py-3">{order.date}</td>

                <td className="font-medium">{order.customer}</td>

                <td>{order.detail}</td>

                <td>{order.product}</td>

                {/* STATUS BADGE */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.status === "Selesai"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Diproses"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* AKSI */}
                <td className="text-right space-x-2">

                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                    Detail
                  </button>

                  <button className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">
                    Update
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