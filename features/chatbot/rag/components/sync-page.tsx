"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useArticles } from "@/features/article/hooks/use-articles";
import { useProducts } from "@/features/product";
import { Database, FileText, RefreshCw } from "lucide-react";
import { useLastSynced } from "../hooks/use-last-synced";
import { formatDate } from "@/lib/format/date";

export default function SyncPage() {
  const { data: products } = useProducts();
  const { data: articles } = useArticles();
  const { data: lastSynced } = useLastSynced();

  return (
    <div className="space-y-between-items">
      <div className="">
        <h1 className="font-bold text-xl">Sinkronisasi Data RAG</h1>
        <p className="text-sm text-muted-foreground">
          Sinkronkan data produk dan artikel untuk pemrosesan RAG
        </p>
      </div>

      <div className="grid grid-cols-4 gap-between-card">
        <Card>
          <CardHeader>
            <CardDescription>Total Produk</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{products?.meta.total ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Artikel</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{articles?.length ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-between-card">
        <div className="space-y-4 bg-card rounded-card border p-inside-card">
          <div className="flex flex-row gap-2">
            <div className="bg-sky-100 text-sky-600 aspect-square p-2 rounded-lg flex items-center justify-center">
              <Database />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">Produk</span>
              <span className="text-muted-foreground">
                Sinkronisasi Terakhir:{" "}
                {lastSynced ? formatDate(lastSynced?.products) : "-"}
              </span>
            </div>
          </div>

          <div className="flex flex-row">
            <span className="text-muted-foreground">Data</span>
            <span className="ml-auto font-semibold">
              {products?.meta.total ?? 0}
            </span>
          </div>

          <Button className="w-full bg-linear-to-r from-blue-500 to-indigo-600">
            <RefreshCw />
            Sinkronisasi Produk
          </Button>
        </div>

        <div className="space-y-4 bg-card rounded-card border p-inside-card">
          <div className="flex flex-row gap-2">
            <div className="bg-indigo-100 text-indigo-600 aspect-square p-2 rounded-lg flex items-center justify-center">
              <FileText />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">Artikel</span>
              <span className="text-muted-foreground">
                Sinkronisasi Terakhir:{" "}
                {lastSynced ? formatDate(lastSynced?.articles) : "-"}
              </span>
            </div>
          </div>

          <div className="flex flex-row">
            <span className="text-muted-foreground">Data</span>
            <span className="ml-auto font-semibold">
              {articles?.length ?? 0}
            </span>
          </div>

          <Button className="w-full bg-linear-to-r from-purple-500 to-pink-500">
            <RefreshCw />
            Sinkronisasi Artikel
          </Button>
        </div>
      </div>
    </div>
  );
}
