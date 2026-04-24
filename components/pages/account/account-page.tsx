import PersonaLInformationForm from "@/components/forms/personal-information-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("personal");

  // Dummy data untuk riwayat dan pesanan diproses
  const riwayatPembelian = [
    {
      id: "INV-001",
      tanggal: "10 Mar 2026",
      produk: "AC Split 1 PK Inverter",
      total: "Rp 4.500.000",
      status: "Selesai",
    },
    {
      id: "INV-002",
      tanggal: "15 Feb 2026",
      produk: "Jasa Cuci AC & Tambah Freon",
      total: "Rp 250.000",
      status: "Selesai",
    },
  ];

  const pesananDiproses = [
    {
      id: "INV-003",
      tanggal: "24 Mar 2026",
      produk: "AC Portable 0.5 PK",
      total: "Rp 2.800.000",
      status: "Sedang Dikirim",
      estimasi: "26 Mar 2026",
    },
  ];

  const handleLogout = () => {
    // Tambahkan logika logout di sini (misal: hapus token, redirect)
    alert("Anda telah berhasil logout.");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonaLInformationForm />;
      case "riwayat":
        return (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Riwayat Pembelian
            </h2>
            <div className="space-y-4">
              {riwayatPembelian.map((item) => (
                <div
                  key={item.id}
                  className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-sm transition"
                >
                  <div>
                    <p className="text-sm text-gray-500">
                      {item.tanggal} • {item.id}
                    </p>
                    <p className="font-semibold text-gray-800">{item.produk}</p>
                    <p className="text-blue-600 font-medium">{item.total}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case "diproses":
        return (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Pesanan Diproses
            </h2>
            <div className="space-y-4">
              {pesananDiproses.map((item) => (
                <div
                  key={item.id}
                  className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-sm transition border-blue-100 bg-blue-50/30"
                >
                  <div>
                    <p className="text-sm text-gray-500">
                      {item.tanggal} • {item.id}
                    </p>
                    <p className="font-semibold text-gray-800">{item.produk}</p>
                    <p className="text-blue-600 font-medium">{item.total}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Estimasi Tiba:{" "}
                      <span className="font-medium">{item.estimasi}</span>
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="">
        <Tabs
          defaultValue="account"
          orientation="vertical"
          className="space-x-10"
        >
          <TabsList className="w-56">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="space-y-4">
              <PersonaLInformationForm/>

              <div className="border p-8 rounded-lg space-y-8">
                <h1 className="text-lg font-semibold">Alamat</h1>

                <FieldGroup>
                  <div className="grid grid-cols-2 gap-4">
                    <Field className="">
                      <FieldLabel>Provinsi</FieldLabel>
                      <Input disabled placeholder="Jawa Barat" />
                    </Field>
                    <Field className="">
                      <FieldLabel>Kota/Kabupaten</FieldLabel>
                      <Input disabled placeholder="Depok" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field className="">
                      <FieldLabel>Alamat</FieldLabel>
                      <Input disabled placeholder="Jl. Kecapi" />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field className="">
                        <FieldLabel>Kode Pos</FieldLabel>
                        <Input disabled placeholder="123456" />
                      </Field>

                      <div className="grid grid-cols-2 gap-4">
                        <Field className="">
                          <FieldLabel>RT</FieldLabel>
                          <Input disabled placeholder="001" />
                        </Field>
                        <Field className="">
                          <FieldLabel>RW</FieldLabel>
                          <Input disabled placeholder="008" />
                        </Field>
                      </div>
                    </div>
                  </div>
                </FieldGroup>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
