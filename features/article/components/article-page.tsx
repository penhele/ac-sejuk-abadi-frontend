"use client";

import { DataTable } from "@/components/tables/data-table";
import { articleColumns } from "./article-columns";
import { useArticles } from "../hooks/use-articles";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Book, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArticlePage() {
  const router = useRouter();
  const { data: articles = [] } = useArticles();

  return (
    <div className="space-y-4">
      <div className="">
        <h1 className="text-3xl font-semibold">Artikel</h1>
        <p className="text-sm text-muted-foreground">
          Kelola artikel yang tersimpan dalam sistem
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row items-center space-x-2">
                <Book size={16} /> <span>Total Artikel</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl font-bold">{articles.length}</h1>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={articleColumns}
        data={articles}
        title="Artikel"
        action={
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => router.push(ROUTES.DASHBOARD_CREATE_ARTICLE)}
          >
            <Plus />
            New Article
          </Button>
        }
      />
    </div>
  );
}
