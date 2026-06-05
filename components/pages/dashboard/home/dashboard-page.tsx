import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandPage from "@/features/brand/compenents/brand-page";
import CategoryPage from "@/features/category/components/category-page";

export default function DashboardPage() {
  return (
    <div className="">
      <Tabs defaultValue="brand" className="space-y-between-items">
        <TabsList variant={"line"}>
          <TabsTrigger value="brand">Brand</TabsTrigger>
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="type">Type</TabsTrigger>
        </TabsList>

        <TabsContent value="brand">
          <BrandPage />
        </TabsContent>

        <TabsContent value="category">
          <CategoryPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
