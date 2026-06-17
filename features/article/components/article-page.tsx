"use client";

import { DataTable } from "@/components/tables/data-table";
import { articleColumns } from "./article-columns";
import { useArticles } from "../hooks/use-articles";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Plus } from "lucide-react";

export default function ArticlePage() {
  const router = useRouter();
  const { data: articles = [] } = useArticles();

  return (
    <div className="">
      <DataTable
        columns={articleColumns}
        data={articles}
        title="Article"
        description="lorem ipsum fore amet"
        action={
          <Button
            size={"sm"}
            variant={'outline'}
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
