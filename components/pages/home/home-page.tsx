import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/lists/product-list";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <h2 className="text-header-h2 font-bold">Featured Product</h2>

        <Tabs defaultValue="overview" className="items-center">
          <TabsList variant="line">
            <TabsTrigger value="overview">New Arrival</TabsTrigger>
            <TabsTrigger value="analytics">Best Selling</TabsTrigger>
            <TabsTrigger value="reports">Top Rated</TabsTrigger>
          </TabsList>
        </Tabs>

        <ProductList className="lg:grid-cols-4" />

        <Button variant={"ghost"}>View All</Button>
      </div>
    </div>
  );
}
