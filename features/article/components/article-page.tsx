"use client";

import { DataTable } from "@/components/tables/data-table";
import { articleColumns } from "./article-columns";
import { useArticles } from "../hooks/use-articles";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Book, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ButtonLink from "@/components/buttons/button-link";

export default function ArticlePage() {
  const router = useRouter();
  const { data: articles = [] } = useArticles();

  return (
    <div className="space-y-4">
      <div className="flex flex-row">
        <div>
          <h1 className="text-xl font-bold ">Projects</h1>
        </div>

        <ButtonLink
          href={ROUTES.DASHBOARD_CREATE_ARTICLE}
          Icon={Plus}
          label="Add Article"
          className="ml-auto"
          variant="default"
          size="sm"
        />
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
