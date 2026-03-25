import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";

export default function CartPage() {
  // Menggunakan state agar keranjang interaktif
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "AC Daikin Inverter 1 PK",
      category: "Unit AC",
      price: 4800000,
      quantity: 1,
      // Menggunakan placeholder untuk gambar
      image: "https://placehold.co/150x150/e2e8f0/475569?text=AC+1+PK",
    },
    {
      id: 2,
      name: "Jasa Cuci AC & Tambah Freon",
      category: "Layanan",
      price: 250000,
      quantity: 2,
      image: "https://placehold.co/150x150/e2e8f0/475569?text=Jasa+Servis",
    },
  ]);

  // Berikan tipe number pada id dan delta
  const updateQuantity = (id: number, delta: number): void => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          // Mencegah kuantitas kurang dari 1
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: number): void => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Kalkulasi Harga
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.11; // Asumsi PPN 11%
  const total = subtotal + tax;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const price = 2500000;
  const originalPrice = 3000000;

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = price * quantity;

  return (
    <div className="">
      <h1 className="text-header-h1 font-bold">Keranjang</h1>

      <div className="">
        <div className="flex flex-row">
          <div className=""></div>

          <div className="flex flex-row gap-8 flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Detail Produk</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex space-x-4 items-center">
                      <div className="w-24">
                        <AspectRatio className="bg-muted" ratio={1 / 1} />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Daikin</span>
                        <span>AC Daikin Inverter 1 PK</span>
                        <span>IDR {price}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-4 items-center">
                      <Button variant={"outline"} onClick={decreaseQty}>
                        <MinusIcon />
                      </Button>

                      <span className="text-lg w-4 flex justify-center">
                        {quantity}
                      </span>

                      <Button variant={"outline"} onClick={increaseQty}>
                        <PlusIcon />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span>IDR {totalPrice}</span>
                  </TableCell>

                  <TableCell>
                    <div className="space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant={"outline"}>
                            <TrashIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant={"outline"}>
                            <ArrowUpRight />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Detail</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="min-w-2xs space-y-4 border p-4 rounded-lg shadow-md">
              <h2 className="">Pemesanan</h2>

              <div className="space-y-2">
                <div className="flex flex-row justify-between">
                  <span className="text-sm text-gray-400">Total barang</span>
                  <span className="text-sm font-medium">9</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm text-gray-400">Subtotal</span>
                  <span className="text-sm font-medium">IDR 4.500.000</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm text-gray-400">Ongkos Kirim</span>
                  <span className="text-sm font-medium">IDR 40.000</span>
                </div>
              </div>

              <Separator />

              <div className="flex flex-row justify-between">
                <span className="text-sm">Total</span>
                <span className="text-sm">IDR 4.540.000</span>
              </div>

              <Button className="w-full">Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
